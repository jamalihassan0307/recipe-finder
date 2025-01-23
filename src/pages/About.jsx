import React from 'react';
import image from "../assets/awais.jpeg"
import image1 from "../assets/danish.jpg"
import image3 from "../assets/waseem.jpg"

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Recipe Hub</h1>
          <p>Bringing the joy of cooking to your kitchen</p>
        </div>
      </div>

      <div className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Recipe Hub, we believe that cooking is more than just preparing food – it's about creating 
            memories, sharing love, and bringing people together. Our mission is to make cooking accessible, 
            enjoyable, and inspiring for everyone, from beginners to seasoned chefs.
          </p>
        </div>
      </div>

      <div className="about-stats">
        <div className="stat-card">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Recipes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">500+</div>
          <div className="stat-label">Expert Chefs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Happy Users</div>
        </div>
      </div>

      <div className="about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎯</div>
            <h3>Quality First</h3>
            <p>We ensure all recipes are tested and perfected before sharing</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community Driven</h3>
            <p>Building a supportive community of food lovers</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>Promoting eco-friendly cooking practices</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🔄</div>
            <h3>Innovation</h3>
            <p>Constantly improving and adding new features</p>
          </div>
        </div>
      </div>

      <div className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
          <img src={image} alt="Team Member" />
            <h3>Awais Kamal</h3>
            <p>Founder & Head Chef</p>
          </div>
          <div className="team-card">
            <img src={image3} alt="Team Member" />
            <h3>Waseem</h3>
            <p>Recipe Curator</p>
          </div>
          <div className="team-card">
            <img src={image1} alt="Team Member" />
            <h3>Danish</h3>
            <p>Food Photographer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 