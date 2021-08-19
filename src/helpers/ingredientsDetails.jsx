function ingredientsDetails(details) {
  const keys = Object.keys(details);

  const ingredients = keys.filter((key) => key
    .includes('strIngredient') && details[key]);
  const measure = keys.filter((key) => key.includes('strMeasure') && details[key]);
  return ingredients.map((ingredient, index) => (
    `${details[ingredient]} - ${details[measure[index]]}`
  ));
}

export default ingredientsDetails;
