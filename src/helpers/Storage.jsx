export const setStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value)));

export const getStorage = (key, value = []) => (
  JSON.parse(localStorage.getItem(key)) || value);

export const dateToday = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};

export const newDoneRecipe = (returnedDetail, typeFoods) => {
  const { idMeal, idDrink, strArea, strCategory, strAlcoholic,
    strMeal, strDrink, strMealThumb, strDrinkThumb, strTags } = returnedDetail;

  const maxTags = 2;
  const newDoneRecip = {
    id: idMeal || idDrink,
    type: typeFoods,
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
    doneDate: dateToday(),
    tags: strTags ? strTags.split(',').slice(0, maxTags) : [],
  };
  return newDoneRecip;
};

export const newFavoriteRecipes = (returnedDetail, typeFoods) => {
  const { idMeal, idDrink, strArea, strCategory, strAlcoholic,
    strMeal, strDrink, strMealThumb, strDrinkThumb } = returnedDetail;

  const newFavoriteRecip = {
    id: idMeal || idDrink,
    type: typeFoods,
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
  };
  return newFavoriteRecip;
};
