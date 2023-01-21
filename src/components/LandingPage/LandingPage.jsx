import React from 'react';
import b from './LandingPage.module.css'
import { Link } from 'react-router-dom';
import slogan from '../../images/logox.png'

const LandingPage = () => {
  return (
    <div className={b.landing}>
        <div className={b.landingLeft}>
          <div className={b.leftContainer}>
            <img src={slogan} alt="" style={{height: '80px', width: 'auto'}}/>
            <h1 className={b.title}>Compass</h1>
          </div>
          
          <p className={b.subtitle}>Exploring the World</p>
        </div>
        <div className={b.landingRight}>
          <div className={b.resume}>
            <h3 className={b.textResume}>Welcome to Compass, it's the individual project for the Henry's bootcamp, it's a single page application that shows you all the countries around the world and information about them, you will be able to create activities and associate it to one country or many of them.</h3>
          </div>
          
          <Link to='/home'><button className={b.button}>Let's explore</button></Link>
        </div>
    </div>
  )
}

export default LandingPage;