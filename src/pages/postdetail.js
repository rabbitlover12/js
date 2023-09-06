import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/postdetail.css';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

async function fetchComments(postId) {
  try {
    const response = await axios.get(`http://localhost:3003/getComments/${postId}`);
    return response.data;
  } catch (error) {
    console.error('코멘트 조회 오류:', error);
    return [];
  }
}

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const nickname = localStorage.getItem('nickname');

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`http://localhost:3003/getPost/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글 조회 오류:', error);
      }
    }

    async function fetchPostComments() {
      const fetchedComments = await fetchComments(id);
      setComments(fetchedComments);
    }

    fetchPost();
    fetchPostComments();
  }, [id]);

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    const shouldCreateComment = window.confirm('댓글을 작성하시겠습니까?');

    if (shouldCreateComment) {
      try {
        const response = await axios.post('http://localhost:3003/createComment', {
          postId: id,
          content: commentContent,
          author: nickname,
        });

        console.log('댓글 생성 성공:', response.data);

        // 댓글 목록을 업데이트하는 함수 호출 등의 추가 로직을 넣으세요.
        
        // 댓글 내용을 초기화합니다.
        setCommentContent('');
      } catch (error) {
        console.error('댓글 생성 오류:', error);
      }
    } else {
      console.log('댓글 작성이 취소되었습니다.');
    }
  };

  return (
    <div className="post-detail">
     {post ? (
    <div>
    <h2>{post.header}</h2>
    {post.userId && <p>작성자: {post.userId}</p>}
    {post.musicTitle && (
    <div className="music-info">
    <p>제목: {post.musicTitle}</p>
    <iframe
      width="35%"
      height="450"
      src={`https://www.youtube.com/embed/${post.musicVideoId}`}
      allowFullScreen
    ></iframe>
  </div>
)}
    {/* 게시글 내용을 가운데 정렬하는 부분 */}
    <div className="post-content">
      <p>{post.main}</p>
    </div>
    {/* 게시글 내용을 가운데 정렬하는 부분 끝 */}
  </div>
) : (
  <p>Loading...</p>
)}
  
      <div className="comment-section">
        <h3>댓글</h3>
        <ul className="commentlist">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index}>
                <p>{comment.author} : {comment.content}</p>
              </li>
            ))
          ) : (
            <li>No comments available.</li>
          )}
        </ul>

        <form onSubmit={handleSubmitComment}>
          <div>
            <label htmlFor="content">댓글 내용:</label>
            <textarea
              id="content"
              name="content"
              value={commentContent}
              onChange={handleCommentContentChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button variant="primary" onClick={handleSubmitComment}>댓글 작성</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;
