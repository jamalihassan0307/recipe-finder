import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={() => navigate('/recipes')} className="back-to-recipes">
            Back to Recipes
          </button>
        </div>
        
        <div className="profile-card">
          <div className="profile-image-section">
            <img 
              src={user.profile_picture || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="large-profile-picture"
            />
          </div>
          
          <div className="profile-details">
            <div className="detail-group">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            
            <div className="detail-group">
              <label>Username</label>
              <p>{user.username}</p>
            </div>
            
            <div className="detail-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 