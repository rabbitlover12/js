import React from 'react'
import banner from '../assets/img/1.gif'
import BannerText from '../components/BannerText';

const Home = () => {
  return (
    <div >
      < img src={banner} alt='배너' style={{display:'block', margin:'0px auto', maxHeight:'80vh'}} />
      <BannerText />
    </div>
  )
}

export default Home;