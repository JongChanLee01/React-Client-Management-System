const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api경로에 hello로 접속을 하면 아래 메시지를 보내도록 함
app.get("/api/hello", (req, res) => {
  res.send({ massage: "Hello Express!" });
});

// 서버가 동작중이면 동작중인 것을 알려줄 수 있도록 출력
// console.log에 따옴표는 숫자1키 왼쪽에 있는 물결표 아래 특수문자로 해야
// 문자열 안에 ${port}같은 변수를 출력 할 수 있음
app.listen(port, () => console.log(`Listening on port ${port}`));
