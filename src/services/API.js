export const fetchFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

export const DrinksIngredients = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const { drinks } = await response.json();
  return drinks;
};

export const FoodsIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { meals } = await response.json();
  return meals;
};

export const DrinksByIngredients = async (strIngredient1) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchFoodDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals[0];
};

export const fetchDrinksDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks[0];
};

export const FoodsByIngredients = async (strIngredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);
  const { meals } = await response.json();
  return meals;
};

export const exploreArea = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
};

export const exploreFoodsByArea = async (value) => {
  if (value !== 'All') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
    const { meals } = await response.json();
    return meals;
  }
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};
