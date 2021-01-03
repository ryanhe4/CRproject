const {Url, Email} = require('../models');
const schedule = require('node-schedule');
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

exports.crawler = async () => {
    // main crawler 30초 마다 반복 호출(job)
    const job = schedule.scheduleJob('*/30 * * * * *', async () => {
        console.log(new Date().toTimeString(), '-반복실행 크롤러');
        const urls = await Url.findAll({
            include: [{
                model: Email,
                attributes: ['email']
            }]
        });
        const urlJson = urls.map((v) => v.get({plain: true}));
        await Promise.all(
            urlJson.map((url) => {
                if (url.Emails?.length > 0) {
                    //crawler 함수 호출
                    const emails = [];
                    url.Emails.forEach((v) => {
                        emails.push(v.email);
                    })
                    worker(url.url, url.lastUpdate, emails);
                }
            })
        )
    });
    // get url data && email.length > 0
};

const worker = async (url, lastUpdate, email) => {
    let checkNewData = false;
    try {
        let checkDate = '0'; // 날짜 확인을 위한 값
        const emailCode = [];

        //url 데이터 요청
        const body = await axios.get(
            url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
                },
            });

        let $ = cheerio.load(body.data);
        const links = $('#tblBidList tbody tr');

        links.each(async (index, element) => {
            const no = $(element).children().eq(0).text();
            const title = $(element).children().eq(3).text().trim();
            const state = $(element).children().eq(5).text().trim();
            const date = $(element).children().eq(7).text();

            // date를 비교해서 있다면 보내온 date 이후의 데이터 전달
            if (date > lastUpdate || lastUpdate === null) {
                checkNewData = true;

                const onclick = $(element).attr('onclick');
                const strarr = onclick.split('\''); // 글 등록 시간

                if (date > checkDate) checkDate = date;
                emailCode.push({no, title, state, codeOflink: strarr[1]});
            }
        });

        if (checkNewData === true) {
            console.log(email);
            // 메일 전송
            const ret = await sendmail(email, emailCode);
            // 전송이 성공했으면 업데이트
            if (!ret) await Url.update({lastUpdate: checkDate,}, {where: {url: url}});
        }
    } catch (e) {
        console.error(e);
    }
}

const sendmail = async (emails, data) => {
    let html = '';
    data.forEach(item => {
        html += (`<div><b>no : ${item.no}</b><br/> title: [${item.state}] ${item.title}<br/>link : <a>http://www.k-apt.go.kr/bid/bidDetail.do?type=4&bid_num=${item.codeOflink}</a><br/></div>`);
    });

    const transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: 'ryan4321@naver.com',
            pass: process.env.MAILPASS
        },
    });

    const mailOptions = {
        from: '알림메일 <ryan4321@naver.com>',
        to: emails,
        subject: '새로운 글 발견',
        html,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error(error);
                transporter.close();
                resolve(1);
            } else {
                console.log(`Message sent: ${info.response}`);
                transporter.close();
                resolve(0);
            }
        })
    });
}
