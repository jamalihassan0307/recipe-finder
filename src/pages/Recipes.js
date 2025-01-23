import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL, ENDPOINTS } from '../constants/constant';

function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}${ENDPOINTS.RECIPES}/${recipe.id}`);
      onDelete(recipe.id);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  if (!recipe) return null;

  const formatSocialRank = (rank) => {
    const numRank = parseFloat(rank);
    return !isNaN(numRank) ? numRank.toFixed(1) : '0.0';
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img src={recipe.image_url} alt={recipe.title} />
        <div className="recipe-overlay">
          <span className="social-rank">
            ⭐ {formatSocialRank(recipe.social_rank)}
          </span>
         
        </div>
      </div>
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p className="publisher">{recipe.publisher}</p>
      </div>
      <div className="recipe-card-actions">
        <div className="action-buttons-left">
          <Link 
            to={`/recipe/${recipe.recipe_id}`} 
            state={{ recipe: recipe }}
            className="view-details-btn"
          >
            View Details
          </Link>
          <a 
            href={recipe.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-recipe-btn"
          >
            View Recipe
          </a>
        </div>
        {user && user.role_id === 1 && (
          <div className="action-buttons-right">
            <button 
              className="action-btn edit-btn"
              onClick={() => navigate(`/recipe/${recipe.id}/edit`, { state: { recipe } })}
            >
              <span className="btn-icon">✏️</span>
              <span className="btn-text">Edit</span>
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => {
                if(window.confirm('Are you sure you want to delete this recipe?')) {
                  handleDelete();
                }
              }}
            >
              <span className="btn-icon">🗑️</span>
              <span className="btn-text">Delete</span>
            </button>
          </div>
        )}
      </div> 
    </div>
  );
}

function Recipes({ searchTerm }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.RECIPES}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        
        // Store recipes in localStorage
        localStorage.setItem('recipes', JSON.stringify(data));
        
        const filteredRecipes = searchTerm
          ? data.filter(recipe => 
              recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : data;

        setRecipes(filteredRecipes);
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  const handleDeleteRecipe = (deletedId) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== deletedId));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h2 className="section-title">Our Recipes</h2>
        {recipes.length === 0 ? (
          <div className="no-results">No recipes found</div>
        ) : (
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.recipe_id} 
                recipe={recipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>
        )}
        {user && user.role_id === 1 && (
          <button 
            onClick={() => navigate('/add-recipe')} 
            className="add-recipe-btn"
          >
            Add Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default Recipes; 