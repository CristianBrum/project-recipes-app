const mensagem = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
function alertNotRecipies(func, msg) {
  func(msg);
}

const msg = ('Sua busca deve conter somente 1 (um) caracter');
const fnAlert = (func, message) => {
  func(message);
};

export const handleFoods = async (radioButton, searchText, setDataFilter, setLoading) => {
  if (radioButton === 'ingrediente') {
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`);
    const { meals } = await response.json();
    if (!meals) {
      alertNotRecipies(alert, mensagem);
      setLoading(false);
      return setDataFilter([]);
    }
    setLoading(false);
    return setDataFilter(meals);
  }

  if (radioButton === 'nome') {
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    const { meals } = await response.json();
    if (!meals) {
      alertNotRecipies(alert, mensagem);
      setLoading(false);
      return setDataFilter([]);
    }
    setLoading(false);
    return setDataFilter(meals);
  }

  try {
    if (radioButton === 'primeira letra' && searchText.length > 1) {
      setDataFilter([]);
      return fnAlert(alert, msg);
    }
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`);
    const { meals } = await response.json();
    setDataFilter(meals);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    return setDataFilter([]);
  }
};

export const handleDrinks = async (radioButton, searchText, setDataFilter,
  setLoading) => {
  if (radioButton === 'ingrediente') {
    try {
      setLoading(true);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`);
      const { drinks } = await response.json();
      setDataFilter(drinks);
    } catch (error) {
      console.log(error);
      alertNotRecipies(alert, mensagem);
      setLoading(false);
      return setDataFilter([]);
    }
  }

  if (radioButton === 'nome') {
    setLoading(true);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
    const { drinks } = await response.json();
    if (drinks === null) {
      alertNotRecipies(alert, mensagem);
      setLoading(false);
      return setDataFilter([]);
    }
    setLoading(false);
    const Max = 12;
    return !drinks ? setDataFilter(drinks) : setDataFilter(drinks.slice(0, Max));
  }

  try {
    if (radioButton === 'primeira letra' && searchText.length > 1) {
      setDataFilter([]);
      return fnAlert(alert, msg);
    }
    setLoading(true);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`);
    const { drinks } = await response.json();
    setDataFilter(drinks);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    setDataFilter([]);
  }
};
