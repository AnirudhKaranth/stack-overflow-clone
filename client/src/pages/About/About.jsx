import React from 'react';
import './About.css'; // You can create a separate CSS file for styling
import Navbar from '../../components/Navbar/Navbar';

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about-container">
        <h1 className="about-title">Hi, I'm Anirudh.</h1>
        <p className="about-description">
          This is a Stack Overflow clone I have built as a personal project. :)
        </p>
    </div>
    </>
  );
};

export default About;
