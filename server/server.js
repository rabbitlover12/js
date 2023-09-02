const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 3003;
const axios = require('axios');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET, { sameSite: "none", secure: true }));


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//mysql연결
connection.connect((err) => {
    if (err) {
      console.error('MySQL 연결 오류:', err);
      return;
    }
    console.log('MySQL에 연결되었습니다.');
  });
   
  let isLoggedIn = false; // 로그인 상태 변수 


// 회원가입 요청 처리
app.post('/api/signup', async (req, res) => {
  const { id, pw, email, nickname } = req.body;
  
  

  // 비밀번호 해싱
  bcrypt.hash(pw, saltRounds, (err, hash) => {
    if (err) {
      console.error('비밀번호 해싱 오류:', err);
      res.status(500).json({ success: false, error: '서버 오류' });
    } else {
      // 사용자 등록 쿼리 실행
      const sql = 'INSERT INTO users (id, pw, email, nickname) VALUES (?, ?, ?, ?)';
      connection.query(sql, [id, hash, email, nickname], (error, results) => {
        if (error) {
          console.error('회원가입 오류:', error);
          res.status(500).json({ success: false, error: '회원가입 오류' });
        } else {
          res.status(200).json({ success: true });
        }
      });
    }
  });
});

// 아이디 중복 확인 요청 처리
app.get('/api/check-duplicate/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT COUNT(*) as count FROM users WHERE id = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('중복 확인 오류:', error);
      res.status(500).json({ success: false, error: '서버 오류' });
    } else {
      const count = results[0].count;
      res.status(200).json({ exists: count > 0 });
    }
  });
});

app.get('/api/check-nickname-duplicate/:nickname', (req, res) => {
  const { nickname } = req.params;
  const sql = 'SELECT COUNT(*) as count FROM users WHERE nickname = ?';
  connection.query(sql, [nickname], (error, results) => {
    if (error) {
      console.error('닉네임 중복 확인 오류:', error);
      res.status(500).json({ success: false, error: '서버 오류' });
    } else {
      const count = results[0].count;
      res.status(200).json({ exists: count > 0 });
    }
  });
});


//로그인 api
// 로그인 API
app.post('/api/signin', (req, res) => {
  const { id, pw } = req.body;
  
  //사용자 정보 조회

  const sql = 'SELECT Id, pw FROM users WHERE Id = ?';
  connection.query(sql,[id], (error, results) => {
    if (error) {
      console.error('로그인 오류: ', error);
      res.status(505).json({ loginSuccess: false, message: '서버오류'});
    } else {
      if (results.length === 0) {
        res.status(401).json({ loginSuccess:false, message:'아이디에 해당하는 유저가 없습니다.'});
      }else {
        const storedHash = results[0].pw;
        bcrypt.compare(pw, storedHash, (err, isMatch) => {
          if(err) {
            console.error('비밀번호 비교 오류: ', err);
            res.status(505).json({ loginSuccess: false, message:'서버오류'});
            return;
          }

          if( isMatch ) {
            res.status(202).json({ loginSuccess: true });
          } else {
            res.status(401).json({ loginSuccess: false, message:'비밀번호가 틀렸습니다.'});
          }
        });
      }
    }
  });
});



//유튜브검색  
  app.get('/search', async (req, res) => {
    try {
      const apiKey = process.env.API_KEY;
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=react&type=video&key=${apiKey}`, {
        params: {
          q: req.query.q,
          key: apiKey,
          part: 'snippet',
          maxResults: 10,
          type: 'video',
        },
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('YouTube 검색 오류:', error);
      res.status(500).send('YouTube 검색에 실패했습니다.');
    }
  });

  //게시글 작성
  app.post('/createPosts', (req, res) => {
    const { newHeader, newMain, selectedMusic } = req.body;
    const query = 'INSERT INTO post (header, main, musicTitle, musicVideoId) VALUES (?, ?, ?, ?)';
    connection.query(query, [newHeader, newMain, selectedMusic.snippet.title, selectedMusic.id.videoId], (err, result) => {
      if (err) {
        console.error('게시글 생성 오류:', err);
        res.status(500).send('게시글 생성에 실패했습니다.');
        return;
      }
      res.status(200).send('게시글이 성공적으로 생성되었습니다.');
    });
  });

  //게시글 조회
  app.get('/getPosts', (req, res) => {
    const query = 'SELECT * FROM post';
    connection.query(query, (err, result) => {
      if (err) {
        console.error('게시글 조회 오류:', err);
        res.status(500).send('게시글 조회에 실패했습니다.');
        return;
      }
      res.status(200).json(result);
    });
  });


  //상세게시글
  app.get('/getPost/:id', (req, res) => {
    const postId = req.params.id;
    const query = 'SELECT * FROM post WHERE id = ?';
    connection.query(query, [postId], (err, result) => {
      if (err) {
        console.error('게시글 조회 오류:', err);
        res.status(500).send('게시글 조회에 실패했습니다.');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('게시글을 찾을 수 없습니다.');
        return;
      }
      res.status(200).json(result[0]);
    });
  });

  
  app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 시작되었습니다.`);
  });

  