import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../constants/constant';
import '../styles/pages/RecipeDetail.css';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchRecipeDetail();
  }, [id, navigate]);

  const fetchRecipeDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.RECIPES}`);
      const recipes = response.data;
      const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(id));
      if (selectedRecipe) {
        setRecipe(selectedRecipe);
      } else {
        navigate('/recipes');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      navigate('/recipes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-hero">
        <img src={recipe.image_url} alt={recipe.title} className="hero-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{recipe.title}</h1>
          <div className="recipe-badges">
            <span className="badge">
              <i className="fas fa-star"></i>
              {Math.round(recipe.social_rank)}
            </span>
            <span className="badge">
              <i className="fas fa-clock"></i>
              30 mins
            </span>
            <span className="badge">
              <i className="fas fa-user-friends"></i>
              4 servings
            </span>
          </div>
        </div>
      </div>

      <div className="recipe-detail-content">
        <div className="recipe-info-grid">
          <div className="recipe-main-info">
            <div className="info-card publisher-card">
              <h2>Publisher Information</h2>
              <div className="publisher-details">
                <img 
                  src={recipe.publisher_url + '/favicon.ico'} 
                  alt={recipe.publisher}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                  className="publisher-logo"
                />
                <div>
                  <h3>{recipe.publisher}</h3>
                  <a 
                    href={recipe.publisher_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="publisher-link"
                  >
                    Visit Publisher Website
                  </a>
                </div>
              </div>
            </div>

            <div className="info-card ingredients-card">
              <h2>Key Ingredients</h2>
              <div className="ingredients-grid">
                {['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'].map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-icon">🥘</span>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recipe-actions">
            <a 
              href={recipe.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button primary"
            >
              <i className="fas fa-external-link-alt"></i>
              View Full Recipe
            </a>
            {user && user.role_id === 1 && (
              <button 
                onClick={() => navigate(`/recipe/${recipe.recipe_id}/edit`, { state: { recipe } })} 
                className="action-button edit"
              >
                <i className="fas fa-edit"></i>
                Edit Recipe
              </button>
            )}
            <button 
              onClick={() => navigate('/recipes')} 
              className="action-button secondary"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Recipes
            </button>
          </div>
        </div>

        <div className="recipe-share">
          <h3>Share this Recipe</h3>
          <div className="share-buttons">
            <button className="share-button facebook">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="share-button twitter">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="share-button pinterest">
              <i className="fab fa-pinterest-p"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail; 