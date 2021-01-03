const express = require('express');
const apiRouter = require('./api');
const morgan = require("morgan");
const cors = require('cors');
const db = require('./models');
const {crawler} = require("./crawler");

db.sequelize.sync().then(() => {
    console.log('db연결 성공');
    crawler();
}).catch(console.error);

const app = express();

app.use(morgan('dev'));
app.use(cors( {
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    res.json('익스프레스 입니다.');
});

app.use('/api', apiRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`서버가 ${port}에서 열렸습니다.`);
});
