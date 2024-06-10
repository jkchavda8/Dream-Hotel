import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/feed-back">FeedBack</Link></li>
          </ul>
        </div>
        <div className="footer_section">
          <h3>Contact Us</h3>
          <p>Madhapar, Bhuj-kutch, India</p>
          <p>Email: dreamhotel@gmail.com</p>
        </div>
        <div className="footer_section">
          <h3>Follow Us</h3>
          <div className="footer_social">
            <a href="https://www.instagram.com/jaychavda678/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/instagram.jpeg" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/in/jay-chavda-2352ba258/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/linkedin.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>&copy; 2024 Dream Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
