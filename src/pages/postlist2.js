import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/postlist.css';
import { Button } from 'react-bootstrap';

function Postlist2() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3003/getPosts');
      setPosts(response.data);
    } catch (error) {
      console.error('게시글 조회 오류:', error);
    }
  };
  const handleWriteClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // 로그인된 상태에서만 글쓰기 페이지로 이동
      window.location.href = '/postlist'; 
    } else {
      // 로그인이 필요합니다. 알림 표시
      alert('로그인이 필요합니다!');
    }
  };

  const handleWriteClick2 = (postId) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {       
      window.location.href = `/postdetail/${postId}`;
    } else {      
      alert('로그인이 필요합니다!');
    }
  };

  return (
    <div className="posts">
      <h2>게시글 목록</h2>
      <Button variant="primary" onClick={handleWriteClick}>
        글쓰기
      </Button>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="post-card-link">
            <div onClick={() => handleWriteClick2(post.id)} style={{ textDecoration: 'none', color: 'black' }}>
              <div>
                <h3>{post.header}</h3>
                <h3>작성자: {post.userId}</h3>
                {post.musicTitle && (
                  <div className="music-info">
                    <h4>선택된 음악</h4>
                    <p>제목: {post.musicTitle}</p>
                    <iframe
                      width="100%"
                      height="150"
                      src={`https://www.youtube.com/embed/${post.musicVideoId}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <p>{post.main}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Postlist2;
