import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/postlist.css';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {        
        const response = await axios.get(`http://localhost:3003/getPost/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글 조회 오류:', error);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <div className="post-detail">
      {post ? (
        <div>
          <h2>{post.header}</h2>
          {post.musicTitle && (
            <div className="music-info">
              <h4>선택된 음악</h4>
              <p>제목: {post.musicTitle}</p>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${post.musicVideoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <p>{post.main}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostDetail;
