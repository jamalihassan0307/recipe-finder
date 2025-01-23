import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover <span className="highlight">Delicious</span> Recipes
          </h1>
          <p className="hero-subtitle">
            Explore thousands of recipes from professional chefs and home cooks
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/recipes')}
          >
            Explore Recipes
          </button>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose Recipe Hub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3>Expert Chefs</h3>
            <p>Recipes from professional chefs and cooking experts worldwide</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌎</div>
            <h3>Global Cuisine</h3>
            <p>Discover dishes from different cultures and regions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Top Rated</h3>
            <p>Find the most loved and highly rated recipes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Easy Access</h3>
            <p>Access recipes anytime, anywhere on any device</p>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          <div className="category-card breakfast">
            <div className="category-content">
              <h3>Breakfast</h3>
              <p>Start your day right</p>
            </div>
          </div>
          <div className="category-card main-course">
            <div className="category-content">
              <h3>Main Course</h3>
              <p>Delicious meals</p>
            </div>
          </div>
          <div className="category-card desserts">
            <div className="category-content">
              <h3>Desserts</h3>
              <p>Sweet treats</p>
            </div>
          </div>
          <div className="category-card healthy">
            <div className="category-content">
              <h3>Healthy</h3>
              <p>Nutritious options</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-preview-section">
        <div className="about-preview-content">
          <div className="about-preview-text">
            <h2>Who We Are</h2>
            <p>
              Recipe Hub is your culinary companion, bringing together passionate food lovers, 
              expert chefs, and amazing recipes from around the world. Our mission is to make 
              cooking accessible, enjoyable, and inspiring for everyone.
            </p>
            <div className="achievement-grid">
              <div className="achievement-item">
                <span className="achievement-number">1000+</span>
                <span className="achievement-label">Recipes</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-number">500+</span>
                <span className="achievement-label">Expert Chefs</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-number">50K+</span>
                <span className="achievement-label">Happy Users</span>
              </div>
            </div>
            <button 
              className="about-preview-button"
              onClick={() => navigate('/about')}
            >
              Learn More About Us
            </button>
          </div>
          <div className="about-preview-image">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Cooking"
            />
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Cooking?</h2>
          <p>Join our community and start exploring amazing recipes today!</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/recipes')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;