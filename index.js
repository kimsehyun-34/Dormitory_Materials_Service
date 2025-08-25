const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json()); // JSON 파싱 미들웨어 추가

// 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8081, '0.0.0.0');
console.log('실행: http://localhost:8081/');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

// 수요조사 POST API
app.post('/survey', (req, res) => {
    const { dormitory, name, room } = req.body;
    if (!dormitory || !name || !room) {
        return res.json({ success: false });
    }
    const entry = { dormitory, name, room, date: new Date().toISOString() };
    const filePath = path.join(__dirname, 'a.conf');
    let data = [];
    try {
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf8');
            data = raw ? JSON.parse(raw) : [];
        }
    } catch (e) {
        // 파일 파싱 오류 시 새로 시작
        data = [];
    }
    data.push(entry);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        res.json({ success: true });
    } catch (e) {
        res.json({ success: false });
    }
});