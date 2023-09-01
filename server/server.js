const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3003;
const axios = require('axios');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const mysql = require("mysql2");

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET, { sameSite: "none", secure: true }));

const connection = mysql2.createConnection({
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
  app.get('/getPosts', async (req, res) => {
    try {
      const query = 'SELECT p.*, COUNT(c.comment_id) AS comment_count FROM post p LEFT JOIN comment c ON p.id = c.post_id GROUP BY p.id';
      const [rows] = await connection.promise().query(query);
      res.status(200).json(rows);
    } catch (err) {
      console.error('게시글 조회 오류:', err);
      res.status(500).send('게시글 조회에 실패했습니다.');
    }
  });


  //상세게시글
  app.get('/getPost/:id', async (req, res) => {
    const postId = req.params.id;
    try {
      const postQuery = 'SELECT * FROM post WHERE id = ?';
      const commentQuery = 'SELECT * FROM comment WHERE post_id = ?';
  
      const [postResult] = await connection.promise().query(postQuery, [postId]);
      const [commentResult] = await connection.promise().query(commentQuery, [postId]);
  
      if (postResult.length === 0) {
        res.status(404).send('게시글을 찾을 수 없습니다.');
        return;
      }
  
      const post = postResult[0];
      const comments = commentResult;
  
      res.status(200).json({ ...post, comments });
    } catch (err) {
      console.error('게시글 조회 오류:', err);
      res.status(500).send('게시글 조회에 실패했습니다.');
    }
  });

  app.post('/createComment', (req, res) => {
    const { postId, content, author } = req.body;
    const query = 'INSERT INTO comment (post_id, content, author) VALUES (?, ?, ?)';
    
    connection.query(query, [postId, content, author], (err, result) => {
      if (err) {
        console.error('댓글 생성 오류:', err);
        res.status(500).send('댓글 생성에 실패했습니다.');
        return;
      }
      res.status(200).send('댓글이 성공적으로 생성되었습니다.');
    });
  });
  
  app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 시작되었습니다.`);
  });