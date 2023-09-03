import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/postlist.css';

function Postlist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newHeader, setNewHeader] = useState('');
  const [newMain, setNewMain] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3003/search', {
        params: {
          q: searchTerm,
        },
      });

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('YouTube 검색 오류:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3003/getPosts');
      setPosts(response.data);
    } catch (error) {
      console.error('게시글 조회 오류:', error);
    }
  };

  const createPost = async () => {
    try {
      if (selectedMusic && newHeader && newMain) {
        const response = await axios.post(
          'http://localhost:3003/createPosts',
          {
            newHeader: newHeader,
            newMain: newMain,
            selectedMusic: selectedMusic, 
          },
          {
            withCredentials: true,
            headers: {
              SameSite: 'None',
              Secure: true,
            },
          }
        );
        console.log(response.data);
        fetchPosts();
        setSelectedMusic(null);
      }
    } catch (error) {
      console.error('게시글 생성 오류:', error);
    }
  };

  

  return (
    <div>
      <div className='create-post-form'>
      <h2>게시판</h2>
          <div className='form-input'>
            <label htmlFor="newHeader">게시글 제목</label>
            <input
            type="text"
            id="newHeader"
            style={{width:'30%'}}
            value={newHeader}
            onChange={(e) => setNewHeader(e.target.value)}
          />
          </div>
            <div className='form-input'>            
            <div className="search-results">
            <div className='search-bar'>
        <input
          type="text"
          placeholder="음악 검색어를 입력하세요"
          style={{width:'500px'}}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
        <h5>검색 결과</h5>
        <div className="card-list">
          {searchResults.slice(0, 8).map((result) => (
            <div key={result.id.videoId} className="card">
              <h3>{result.snippet.title}</h3>
              <img
                src={result.snippet.thumbnails.default.url}
                alt={result.snippet.title}
              />
              
              <button onClick={() => setSelectedMusic(result)}>게시글로 올리기</button>
            </div>
          ))}
        </div>
        {/* <label htmlFor="newHeader">게시글 내용</label> */}
      </div>
      {selectedMusic && (
          <div className="selected-music">
            <h2>선택된 음악</h2>
            <h3>{selectedMusic.snippet.title}</h3>
            <p>{selectedMusic.snippet.description}</p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedMusic.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}            
            <textarea
              id="newMain"
              value={newMain}
              onChange={(e) => setNewMain(e.target.value)}
            />
          </div> 
        <button onClick={createPost}>게시글 생성</button>
      </div>
     
    </div>
  );
}

export default Postlist