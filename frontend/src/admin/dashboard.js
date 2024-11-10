import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    label: '',
    image: '',
    totalTime: '',
    calories: '',
    ingredients: ['']
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? e.target.value : ingredient
    );
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/recipes', formData);
      setMessage(res?.data?.message || 'Recipe saved successfully!');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Error saving recipe');
    }
  };
  

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f7fa',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      <h2 style={{
        fontSize: '2em',
        color: '#4b79a1',
        textShadow: '1px 1px 3px #b3cde0',
        marginBottom: '20px'
      }}>Add a Recipe</h2>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Recipe Name</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4b79a1'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4b79a1'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Total Time (minutes)</label>
          <input
            type="number"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4b79a1'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Calories</label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4b79a1'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                marginBottom: '10px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4b79a1'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4b79a1',
              color: '#ffffff',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#376089'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4b79a1'}
          >
            Add Ingredient
          </button>
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4b79a1',
          color: '#ffffff',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#376089';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#4b79a1';
          e.target.style.transform = 'scale(1)';
        }}>
          Save Recipe
        </button>
      </form>
      {message && <p style={{
        color: message.includes('success') ? 'green' : 'red',
        marginTop: '15px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
      }}>{message}</p>}
    </div>
  );
};

export default RecipeForm;
