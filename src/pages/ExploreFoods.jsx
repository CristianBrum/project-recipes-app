import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import '../styles/Explore.css';

function ExploreFoods() {
  const [food, setFood] = useState();

  async function endpoint() {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php',
    )
      .then((data) => data.json())
      .then((e) => e.meals[0].idMeal);
    return response;
  }

  useEffect(() => {
    endpoint().then((resp) => setFood(resp));
  }, []);
  const history = useHistory();
  return (
    <>
      <Header />
      <div className="explore">
        <button
          type="button"
          className="button-categories"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          className="button-categories"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>

        <button
          type="button"
          className="button-categories"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/comidas/${food}`) }
        >
          Me Surpreenda!
        </button>

        <LowerMenu />
      </div>
    </>
  );
}

export default ExploreFoods;
