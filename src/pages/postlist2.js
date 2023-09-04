import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/postlist2.css';
import { Button } from 'react-bootstrap';


function Postlist2() {
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState('');
  

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



//검색기능(?) 임시
  const handleSearchPost = () => {
  const filteredPosts = posts.filter((post) =>
    post.header.toLowerCase().includes(searchPost.toLowerCase())
  );
  setPosts(filteredPosts);
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
      <h2>전체 게시글</h2>
      <Button variant="primary" onClick={handleWriteClick}>
        글쓰기
      </Button>
        <div className="search">
          <input
          type="text"
          placeholder="검색어를 입력하세요"
          style={{ width: '300px' }}
          value={searchPost}
          onChange={(e) => setSearchPost(e.target.value)} // onChange 핸들러 사용
          />
        <Button variant="primary" onClick={handleSearchPost}>검색</Button>
        </div>
        
      <ul style={{margin : '30px'}}>
        {posts.map((post, index) => (
          <li key={index} className="post-card-link">
            <div onClick={() => handleWriteClick2(post.id)} style={{ textDecoration: 'none', color: 'black' }}>
              <div>
                <h3>{post.header}</h3>
                <p>닉네임: {post.userId}</p>
                {post.musicTitle && (
                  <div className="music-info">
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
                <p>댓글 수: {post.comment_count}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Postlist2;
