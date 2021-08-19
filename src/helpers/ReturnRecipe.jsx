import { fetchFoodDetails, fetchDrinksDetails } from '../services/API';
import ingredientsDetails from './ingredientsDetails';

const ReturnRecipe = async (id, food, drink) => {
  if (food) {
    const fetchDetails = await fetchFoodDetails(id);
    const typeFood = 'comida';
    const recipeType = 'meals';
    const ingredientsList = ingredientsDetails(fetchDetails);
    return { fetchDetails, typeFood, recipeType, ingredientsList };
  }
  if (drink) {
    const fetchDetails = await fetchDrinksDetails(id);
    const typeFood = 'bebida';
    const recipeType = 'cocktails';
    const ingredientsList = ingredientsDetails(fetchDetails);
    return { fetchDetails, typeFood, recipeType, ingredientsList };
  }
};

export default ReturnRecipe;
