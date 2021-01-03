const {Url} = require('../../models');

exports.addUrl = async (req, res, next) => {
    try {
        // 1. URL validate
        const validate = req.body.url.match(/^([\w-]+(=[\w-]*)?(&[\w-]+(=[\w-]*)?)*)?$/);
        if (!validate) {
            return res.status(403).send('잘못된 형식의 url 입니다.');
        }
        if (req.body.url.indexOf('type') === -1) {
            return res.status(403).send('url을 정확히 확인해주세요: type');
        }
        if (req.body.url.indexOf('pageNo=1') === -1) {
            return res.status(403).send('url을 정확히 확인해주세요: pageNo');
        }

        // url already exist
        const exist = await Url.findOne({
            where: {url: 'http://k-apt.go.kr/bid/bidList.do?' + req.body.url}
        });
        if (exist) {
            return res.status(403).send('이미 존재하는 URL 입니다.');
        }

        // 2. URL 추가
        const url = await Url.create({
            url: 'http://k-apt.go.kr/bid/bidList.do?' + req.body.url,
            lastUpdate: null,
        });

        // 3. 결과 반환
        res.status(201).json(url);
    } catch (e) {
        console.error(e);
        next(e);
    }
}
exports.removeUrl = async (req, res, next) => {
    try {
        const urlId = req.params.urlId;

        await Url.destroy({
            where: {
                id: urlId,
            },
        });
        res.json({urlId: parseInt(urlId, 10)});
    } catch (e) {
        console.error(e);
        next(e);
    }
}

exports.loadUrl = async (req, res, next) => {
    try {
        const urls = await Url.findAll({
            limit:5,
            order: [['createdAt', 'DESC']],
        })
        res.status(200).json(urls);
    } catch (e) {
        console.error(e);
        next(e);
    }
}
