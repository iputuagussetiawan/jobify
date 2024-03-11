import React from 'react';
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span> app</h1>
          <p>
          digital system designed to monitor and manage various aspects of job assignments, projects, or tasks within an organization. It provides a centralized platform accessible via web browsers, allowing users to efficiently oversee the progress of tasks, allocate resources, set deadlines, and communicate with team members
          </p>
          <Link to="/register" className='btn register-link'>Register</Link>
          <Link to="/login" className='btn register-link'>Login</Link>
        </div>
        <img src={main} alt="hero image" className='img main-img' />
      </div>
    </Wrapper>
  )
}


export default Landing