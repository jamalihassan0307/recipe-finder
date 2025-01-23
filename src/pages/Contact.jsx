import React from 'react';

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@recipehub.com';
  };

  return (
    <div className="contact-page">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <div className="contact-cards">
          <div className="contact-card" onClick={handleEmailClick}>
            <div className="contact-icon">✉️</div>
            <h3>Email Us</h3>
            <p>awaiskamal848@gmail.com</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>+92325 8658817</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Visit Us</h3>
            <p>University chock<br />bahawalpur City, pakistan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 