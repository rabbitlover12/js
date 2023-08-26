import React from 'react'
import banner from '../img/1.gif'
import BannerText from './BannerText';

const Home = () => {
  return (
    <div>
      <img src={banner} alt='배너' style={{display:'block', margin:'0px auto'}} />
      <BannerText />
    </div>
  )
}

export default Home