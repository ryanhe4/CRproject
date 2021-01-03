const {Url, Email} = require('../../models');

exports.loadEmail = async (req, res, next) => {
    try {
        // req.param.urlId
        const urlId = req.params.urlId;
        const emails = await Email.findAll({
            attributes: ['id', 'email'],
            include: [{
                model: Url,
                where: {id: urlId},
                attributes: [],
            }]
        });
        res.status(200).json(emails);
    } catch (e) {
        console.error(e);
        next(e);
    }
}

exports.removeEmail = async (req, res, next) => {
    try {
        const {emailId, urlId} = req.body;

        // 해당하는 url이 없는 경우
        const url = await Url.findOne({
            where: {id: urlId},
        });
        if (!url) return res.status(401).send('존재하지 않는 url 입니다.');

        // 삭제 할 이메일이 없는 경우
        const exEmail = await Email.findOne({
            where: {id: emailId},
            include: [{model: Url}]
        });
        if (!exEmail) return res.status(401).send('존재하지 않는 이메일 입니다.');

        // 이메일이 2개이상의 링크에 포함되 있는 경우
        const exEmailJson = exEmail.get({plain: true});
        if(exEmailJson.Urls.length > 1) {
            // 2. remove email
            await exEmail.removeUrl(url);

            return res.json({emailId: parseInt(emailId, 10)});
        }

        const email = await Email.destroy({
            where: {
                id: emailId,
            },
        });

        res.json({emailId: parseInt(emailId, 10)});
    } catch (e) {
        console.error(e);
        next(e);
    }
}

exports.addEmail = async (req, res, next) => {
    //POST
    try {
        const {email, urlId} = req.body;

        if (!email || !urlId) {
            return res.status(403).json('올바르지 않은 형식 입니다.');
        }

        const url = await Url.findOne({
            where: {id: urlId},
            include: [{
                model: Email,
                attributes: ['id', 'email']
            }]
        })

        if (!url) {
            return res.status(403).json('존재하지 않는 URL 입니다.');
        }

        const validate = await req.body.email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
        if (!validate) {
            return res.status(403).json('알맞지 않은 이메일형식 입니다.');
        }

        const exEmail = await Email.findOne({
            where: {email}
        });

        if (exEmail) {
            // email이 있지만 url에 없는 경우 / 있는경우
            const urlData = url.get({plain: true});

            if (urlData.Emails.find((v) => v.email === email)) {
                return res.status(403).json('이미 존재하는 이메일 입니다.');
            }
            await url.addEmail(exEmail);

            // [exEmail]의 url 데이터를 include 시켜야함.
            const fullEmail = await Email.findOne({
                where: {email},
                attributes: ['id', 'email'],
                include: [{
                    model: Url,
                    attributes: ['id']
                }]
            });

            return res.status(201).json(fullEmail);
        }

        const reEmail = await Email.create({
            email,
        });

        await url.addEmail(reEmail);

        // [reEmail]의 url 데이터를 include 시켜야함.
        const fullEmail = await Email.findOne({
            where: {email},
            attributes: ['id', 'email'],
            include: [{
                model: Url,
                attributes: [],
            }]
        })

        res.status(201).json(fullEmail);
    } catch (e) {
        console.error(e);
        next(e);
    }
}
