import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/postlist.css';
import { Link } from 'react-router-dom';
import {  Button } from 'react-bootstrap';



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

  


    return (
        <div className="posts">
            <h2>게시글 목록</h2>
            <Link to="/postlist">
                <Button variant="primary">글쓰기</Button>
            </Link>
            <ul>
                {posts.map((post, index) => (
                <li key={index} className="post-card-link">
                    {/* post.id를 바로 li 요소의 key로 설정 */}
                    <Link to={`/postdetail/${post.id}`} style={{ textDecoration: "none", color: 'black' }}>
                    <div>
                        <h3>{post.header}</h3>
                        {post.musicTitle && (
                        <div className="music-info">
                            
                        </div>
                        )}
                        <p>{post.main}</p>
                    </div>
                    </Link>
                </li>
                ))}
            </ul>
            </div>
    );
  }

export default Postlist2;

