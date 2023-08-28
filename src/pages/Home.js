import React from 'react'
import banner from '../assets/img/1.gif'
import BannerText from '../components/BannerText';

const Home = () => {
  return (
    <div style={{height:'5000px'}}>
      < img src={banner} alt='배너' style={{display:'block', margin:'0px auto'}} />
      <BannerText />
    </div>
  )
}

export default Home