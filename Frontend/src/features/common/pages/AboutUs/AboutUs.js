/**
 * About Us Page
 * Information about the project and team
 */

import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>C-DAC: Centre for Development of Advanced Computing, India</h1>
      <h2>Gym Management Project</h2>
      <p>
        Welcome to our Gym Management Project! This project aims to provide an
        efficient solution for managing gym operations, member details,
        trainers, and more. Our team has put in a lot of effort to design and
        develop this application.
      </p>
      <h3>Project Group Members:</h3>
      <ul>
        <li>Aditya Vinod Raghuvanshi (Team Leader)</li>
        <li>Suyog Vinod Chitte (Team Member)</li>
        <li>Pratik Londhe (Team Member)</li>
        <li>Aarti Kapadne (Team Member)</li>
      </ul>
      <div className="social-links">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
