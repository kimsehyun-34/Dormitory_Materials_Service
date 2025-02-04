const express = require('express');
const path = require('path');

const app = express();

// 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8081, '0.0.0.0');
console.log('실행: http://localhost:8081/');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});