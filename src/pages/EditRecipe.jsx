import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../constants/constant';
import '../styles/pages/AddRecipe.css';

const EditRecipe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [recipe, setRecipe] = useState(location.state?.recipe || {
    image_url: '',
    publisher: '',
    publisher_url: '',
    recipe_id: '',
    social_rank: 0,
    source_url: '',
    title: '',
    recipe_method: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role_id !== 1) {
      navigate('/recipes');
      return;
    }

    // If no recipe data was passed through navigation state, go back to recipes
    if (!location.state?.recipe) {
      navigate('/recipes');
      return;
    }
  }, [navigate, user, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: name === 'social_rank' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}${ENDPOINTS.RECIPES}/${id}`, recipe);
      navigate('/recipes');
    } catch (error) {
      console.error('Error updating recipe:', error);
      setError('Failed to update recipe. Please try again.');
    }
  };

  return (
    <div className="add-recipe-container">
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <h2>Edit Recipe</h2>
        {error && <p className="error">{error}</p>}
        
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="publisher"
          placeholder="Publisher Name"
          value={recipe.publisher}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="publisher_url"
          placeholder="Publisher Website URL"
          value={recipe.publisher_url}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="image_url"
          placeholder="Recipe Image URL"
          value={recipe.image_url}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="source_url"
          placeholder="Source URL"
          value={recipe.source_url}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="recipe_id"
          placeholder="Recipe ID"
          value={recipe.recipe_id}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="social_rank"
          placeholder="Social Rank (0-100)"
          value={recipe.social_rank}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
        
        <textarea
          name="recipe_method"
          placeholder="Recipe Method"
          value={recipe.recipe_method}
          onChange={handleChange}
          required
        />
        
        <div className="form-actions">
          <button type="submit" className="primary">Update Recipe</button>
          <button type="button" onClick={() => navigate('/recipes')} className="secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe; 