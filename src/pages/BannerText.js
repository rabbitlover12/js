import React, { useState, useEffect } from 'react';
import './BannerText.css';

const BannerText = () => {
  const categories = ['#우울', '#행복', '#기쁨', '#분노', '#사랑', '#휴식', '#연애', '#일상', '#여행'];
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setCurrentCategory(categories[randomIndex]);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='banner-text'>
      오늘 나의 플레이리스트는? {currentCategory}
    </div>
  );
};

export default BannerText;