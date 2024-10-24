const API_KEY = '1fbe1e25532448dfa8ce7a76bcec174e';
const RANDOM_RECIPE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;
const SEARCH_RECIPE_URL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}`;

// Random Recipe
async function fetchRandomRecipe() {
    try {
        const response = await fetch(RANDOM_RECIPE_URL);
        const data = await response.json();
        const recipe = data.recipes[0];

        // Recipe Details
        document.getElementById('randomRecipeText').innerHTML = `
            <h3><a href="${recipe.sourceUrl}" target="_blank">${recipe.title}</a></h3>
            <p>${recipe.summary}</p>
        `;
        document.getElementById('randomRecipeImage').src = recipe.image;
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        document.getElementById('randomRecipeText').innerHTML = 'Failed to load random recipe.';
    }
}

// Search for Recipes by Ingredient
async function searchRecipesByIngredient(ingredient) {
    try {
        const response = await fetch(`${SEARCH_RECIPE_URL}&ingredients=${ingredient}`);
        const recipes = await response.json();
        
        // clear previous results
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

        // display results
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe';
            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h4><a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">${recipe.title}</a></h4>
            `;
            resultsContainer.appendChild(recipeElement);
        });

        if (recipes.length === 0) {
            resultsContainer.innerHTML = '<p>No recipes found for this ingredient.</p>';
        }
    } catch (error) {
        console.error('Error searching recipes:', error);
        document.getElementById('searchResults').innerHTML = 'Failed to load search results.';
    }
}

// search button
document.getElementById('searchButton').addEventListener('click', () => {
    const ingredient = document.getElementById('ingredientInput').value;
    if (ingredient) {
        searchRecipesByIngredient(ingredient);
    } else {
        alert('Please enter an ingredient.');
    }
});

fetchRandomRecipe();
