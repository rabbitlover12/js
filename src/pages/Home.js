import React from 'react'
import banner from '../assets/img/1.gif'
import BannerText from '../components/BannerText';

const Home = () => {
  return (
    <div style={{height:'1600px'}}>
      < img src={banner} alt='배너' className='image' style={{display:'block', margin:'0px auto', marginTop:'10%'}} />
      <BannerText />
    </div>
  )
}

export default Home;