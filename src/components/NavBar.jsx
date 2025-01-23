import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/components/NavBar.css';

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    if (location.pathname !== '/recipes') {
      navigate('/recipes');
    }
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <span className="brand-icon">🍳</span>
          <span className="brand-text">Recipe Hub</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/about" className="nav-link">
          <span className="nav-icon">ℹ️</span>
          <span>About</span>
        </Link>
        <Link to="/contact" className="nav-link">
          <span className="nav-icon">📞</span>
          <span>Contact</span>
        </Link>
        { user.role_id === 1 ? (
          <Link to="/add-recipe" className="nav-link">
            <span className="nav-icon">📝</span>
            <span>Add Recipe</span>
          </Link>
        ):(<></>)}
        <div className="search-container">
          <button 
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
          >
            <span className="nav-icon">🔍</span>
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search recipes..."
              className="nav-search-input"
              onChange={handleSearch}
              autoFocus
            />
          )}
        </div>
        {user?.email ? (
          <div className="nav-profile">
            <div className="profile-dropdown">
              <img 
                src={user.profile_picture || 'https://via.placeholder.com/40'} 
                alt="Profile" 
                onClick={() => navigate('/profile')}
              />
              <div className="profile-name">{user.name}</div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-button">
            <span className="nav-icon">👤</span>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 