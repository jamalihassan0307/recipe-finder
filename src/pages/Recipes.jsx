import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../constants/constant';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Recipes.css';

const Recipes = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchRecipes();
  }, [navigate]);

  useEffect(() => {
    if (recipes.length > 0) {
      applyFilters(activeFilter, searchTerm);
    }
  }, [searchTerm, recipes, activeFilter]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.RECIPES}`);
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const applyFilters = (filter, search) => {
    let filtered = [...recipes];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.publisher.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    switch (filter) {
      case 'popular':
        filtered = filtered.sort((a, b) => b.social_rank - a.social_rank).slice(0, 10);
        break;
      case 'recent':
        // Assuming we have a timestamp field, if not we'll use the last 10 items
        filtered = filtered.slice(-10).reverse();
        break;
      case 'trending':
        // Combine social rank and recency for trending
        filtered = filtered
          .sort((a, b) => {
            const rankWeight = 0.7;
            const recentWeight = 0.3;
            const rankScore = (b.social_rank - a.social_rank) * rankWeight;
            const recentScore = (b.id - a.id) * recentWeight;
            return rankScore + recentScore;
          })
          .slice(0, 10);
        break;
      default:
        // 'all' - no additional filtering needed
        break;
    }

    setFilteredRecipes(filtered);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="recipes-page">
      <div className="recipes-hero">
        <div className="recipes-hero-content">
          <h1>Our Recipe Collection</h1>
          <p>Discover a world of flavors curated by expert chefs and food enthusiasts</p>
        </div>
      </div>

      <div className="recipes-filters">
        <div className="filter-container">
          <div className="filter-tags">
            <span 
              className={`filter-tag ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              All
            </span>
            <span 
              className={`filter-tag ${activeFilter === 'popular' ? 'active' : ''}`}
              onClick={() => handleFilterClick('popular')}
            >
              Popular
            </span>
            <span 
              className={`filter-tag ${activeFilter === 'recent' ? 'active' : ''}`}
              onClick={() => handleFilterClick('recent')}
            >
              Recent
            </span>
            <span 
              className={`filter-tag ${activeFilter === 'trending' ? 'active' : ''}`}
              onClick={() => handleFilterClick('trending')}
            >
              Trending
            </span>
          </div>
          <div className="active-filter-info">
            {activeFilter !== 'all' && (
              <p>Showing top 10 {activeFilter} recipes</p>
            )}
          </div>
        </div>
      </div>

      <div className="recipes-main">
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image-container">
                <img src={recipe.image_url} alt={recipe.title} />
                <div className="recipe-overlay">
                  <span className="social-rank">
                    ⭐ {Math.round(recipe.social_rank)}
                  </span>
                </div>
              </div>
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p className="publisher">By {recipe.publisher}</p>
                <div className="recipe-card-actions">
                  <a 
                    href={recipe.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-recipe-btn"
                  >
                    View Recipe
                  </a>
                  <button 
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recipes-summary">
        <div className="summary-content">
          <div className="summary-text">
            <h2>Cooking Made Easy</h2>
            <p>
              Join thousands of home cooks who have discovered the joy of cooking 
              with our carefully curated recipes. From quick weekday meals to 
              elaborate weekend feasts, we have something for everyone.
            </p>
            <div className="recipe-stats">
              <div className="stat-item">
                <span className="stat-number">{recipes.length}</span>
                <span className="stat-label">Total Recipes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;