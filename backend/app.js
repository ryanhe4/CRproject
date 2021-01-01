const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json('익스프레스 입니다.');
});


const port = process.env.PORT|| 4000;
app.listen(port, () => {
  console.log(`서버가 ${port}에서 열렸습니다.`);
});
