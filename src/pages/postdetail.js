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
    return []; // 오류 발생 시 빈 배열을 반환하거나 다른 기본값을 사용할 수 있음
  }
}

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
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

  const handleCommentAuthorChange = (event) => {
    setCommentAuthor(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
  
    const shouldCreateComment = window.confirm('댓글을 작성하시겠습니까?');
  
    if (shouldCreateComment) {
      try {
        const response = await axios.post('http://localhost:3003/createComment', {
          postId: id, // 현재 게시글의 ID
          content: commentContent,
          author: nickname, // 닉네임 사용
        });
  
        // 댓글 생성 성공 시, 서버로부터 받은 응답을 처리할 수 있음
        console.log('댓글 생성 성공:', response.data);
  
        // 댓글 생성 후, 입력 필드 초기화
        setCommentContent('');
  
        // 댓글 목록을 업데이트할 수 있는 함수를 호출
        // 예: fetchPostComments();
      } catch (error) {
        console.error('댓글 생성 오류:', error);
      }
    } else {
      // 사용자가 "취소"를 선택한 경우
      console.log('댓글 작성이 취소되었습니다.');
    }
  };

  return (
    <div className="post-detail">
      {post ? (
        <div>
          <h2>{post.header}</h2>
          <p>작성자:{post.userId}</p>
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
          <p>{post.main}</p>
          <div className="createcomment">
          <h3>댓글</h3>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index}>                  
                  <p>{comment.author} : {comment.content}</p>
                  {/* <p>작성일: {comment.created_at}</p> */}
                </li>
              ))
            ) : (
              <li>No comments available.</li>
            )}
          </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* 댓글 생성 폼 */}
      <div className='commentlist'>
      <form onSubmit={handleSubmitComment}>
        <div>
          <label htmlFor="content">댓글 내용:</label>
          <textarea id="content" name="content" value={commentContent} onChange={handleCommentContentChange} />
        </div>        
        <Button variant="primary">댓글 작성</Button>
      </form>
      </div>
    </div>
  );
}

export default PostDetail;
