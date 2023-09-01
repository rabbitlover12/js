import React, { useState, useEffect } from 'react';
import TypeIt from 'typeit-react';
import './css/BannerText.css';

const BannerText = () => {
  const categories = ['#우울', '#행복', '#기쁨', '#분노', '#사랑', '#휴식', '#연애', '#일상', '#여행'];
  const [currentCategory, setCurrentCategory] = useState('');
  const [instance, setInstance] = useState(null);
  

  
  
  

 

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setCurrentCategory(categories[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className='banner-text'>      
      나의 플레이리스트는?{' '}  {currentCategory}
      <TypeIt
        options={{ 
          loop: true, 
          strings:[ 'asdfasdfasdfasdfadsfadsfasdfassdfasdfasdfadsfasdfasdf' ] ,
          waitUntilVisible: true,  
          random:[],
          cursorChar: "⭐",
          cursor: {
            autoPause: false,
            animation: {
              options: {
                duration: 1000,
                easing: "linear",
                direction: "alternate",
              },
              frames: [
                {
                  transformOrigin: "0.575em 0.7em",
                  transform: "rotate(0deg) scale(1)",
                },
                {
                  transformOrigin: "0.575em 0.7em",
                  transform: "rotate(360deg) scale(1)",
                },
              ],
            },
          }
          
                  
        }}
        getAfterInit={(instance) => {
          setInstance(instance);
          return instance;
        }}
      />   
          <div id>

          </div>
      
      
    </div>
  );
};

export default BannerText;