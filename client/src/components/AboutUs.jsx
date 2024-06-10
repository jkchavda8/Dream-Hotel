import React from 'react';
import "../styles/AboutUs.css"; 

const AboutUs = () => {
  return (
    <div className="aboutus">
      <div className="aboutus_header">
        <img src='/assets/jay.jpg' alt="Founder" className="aboutus_personal_image" />
        <h1>About Dream Hotel</h1>
        <p>Where luxury meets comfort, and dreams become reality.</p>
      </div>
      <div className="aboutus_content">
        <section className="aboutus_section">
          <h2>Our Mission</h2>
          <p>
            At Dream Hotel, our mission is to provide an unparalleled hospitality experience, ensuring every guest feels at home and indulges in luxury. We are dedicated to creating memorable stays with personalized service and exquisite amenities.
          </p>
        </section>
        <section className="aboutus_section">
          <h2>Our Vision</h2>
          <p>
            Our vision is to be the premier choice for travelers seeking an extraordinary stay. We aim to set the standard for excellence in the hotel industry, known for our innovative approach and commitment to guest satisfaction.
          </p>
        </section>
        <section className="aboutus_section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Integrity:</strong> Upholding the highest standards in our operations and interactions.</li>
            <li><strong>Excellence:</strong> Continuously striving to exceed expectations in all we do.</li>
            <li><strong>Guest Focus:</strong> Prioritizing the needs and comfort of our guests above all.</li>
            <li><strong>Innovation:</strong> Embracing new ideas to enhance our services and facilities.</li>
            <li><strong>Teamwork:</strong> Fostering a collaborative environment to achieve our goals.</li>
          </ul>
        </section>
        <section className="aboutus_section">
          <h2>Our Team</h2>
          <p>
            Our dedicated team at Dream Hotel is passionate about hospitality and committed to providing exceptional service. With a diverse background and extensive experience, we work together to create a welcoming and luxurious environment for all our guests.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
