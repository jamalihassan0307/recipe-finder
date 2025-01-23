import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import './styles/common.css';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <NavBar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes searchTerm={searchTerm} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id/edit" element={<EditRecipe />} />
        <Route path="/" element={<Navigate to="/recipes" />} />
      </Routes>
    </Router>
  );
}

export default App;
