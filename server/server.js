const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 3003;

require('dotenv').config();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
      console.error('MySQL 연결 오류:', err);
      return;
    }
    console.log('MySQL에 연결되었습니다.');
  });

  app.post('/api/custom-login', (req, res) => {
    const { id, pw } = req.body;
  
    
    const query = 'SELECT * FROM users WHERE id = ? AND pw = ?';
    connection.query(query, [id, pw], (error, results) => {
      if (error) {
        console.error('MySQL 오류:', error);
        res.status(500).json({ success: false, message: '데이터베이스 오류' });
        return;
      }
  
      if (results.length > 0) {
        // 로그인 성공
        res.json({ success: true });
      } else {
        // 로그인 실패
        res.json({ success: false });
      }
    });
  });
  
  app.get('/api/check-duplicate/:id', (req, res) => {
    const { id } = req.params;
  
    // 해당 아이디가 이미 존재하는지 조회
    const query = 'SELECT id FROM users WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error('MySQL 오류:', error);
        res.json({ exists: false });
        return;
      }
      res.json({ exists: results.length > 0 });
    });
  });
  
  app.post('/api/signup', (req, res) => {
    const { id, pw } = req.body;
  
    
    const insertQuery = 'INSERT INTO users (id, pw) VALUES (?, ?)';
    connection.query(insertQuery, [id, pw], (error, results) => {
      if (error) {
        console.error('MySQL 오류:', error);
        res.json({ success: false });
        return;
      }
      res.json({ success: true });
    });
  });
  
  app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('MySQL 오류:', error);
        res.status(500).json({ success: false, message: '데이터베이스 오류' });
        return;
      }
      res.json({ success: true, data: results });
    });
  });
  
  
  
  app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 시작되었습니다.`);
  });