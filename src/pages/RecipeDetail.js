import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div className="error-message">
        Recipe not found
        <button className="action-button secondary" onClick={() => navigate(-1)}>
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-hero">
        <img src={recipe.image_url} alt={recipe.title} className="hero-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{recipe.title}</h1>
        </div>
      </div>

      <div className="recipe-detail-content">
        <div className="recipe-info-grid">
          <div className="info-card">
            <div className="publisher-card">
              <h2>Publisher</h2>
              <div className="publisher-details">
                <p>{recipe.publisher}</p>
                <a href={recipe.publisher_url} className="publisher-link" target="_blank" rel="noopener noreferrer">
                  Visit Publisher
                </a>
              </div>
            </div>

            <div className="recipe-method">
              <h3>🥘 Cooking Instructions</h3>
              <ol className="method-steps">
                {recipe.recipe_method.split(/[.,]/)
                  .map(step => step.trim())
                  .filter(step => step.length > 0)
                  .map((step, index) => (
                    <li key={index} className="method-step">
                      {step}
                    </li>
                  ))}
              </ol>
            </div>

            <div className="recipe-actions">
              <a href={recipe.source_url} className="action-button primary" target="_blank" rel="noopener noreferrer">
                View Original Recipe
              </a>
              <button className="action-button secondary" onClick={() => navigate(-1)}>
                Back to Recipes
              </button>
            </div>
          </div>

          <div className="info-card">
            <div className="recipe-meta">
              <div className="badge">
                <span>Social Rank: {recipe.social_rank?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail; 