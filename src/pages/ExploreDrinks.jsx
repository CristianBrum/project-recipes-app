import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import '../styles/Explore.css';

function ExploreDrinks() {
  const [drink, setDrink] = useState();

  async function endpoint() {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    )
      .then((data) => data.json())
      .then((e) => e.drinks[0].idDrink);
    return response;
  }

  useEffect(() => {
    endpoint().then((resp) => setDrink(resp));
  }, []);
  const history = useHistory();
  return (
    <>
      <Header />
      <div className="explore">
        <button
          className="button-categories"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          className="button-categories"
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/bebidas/${drink}`) }
        >
          Me Surpreenda!
        </button>
        <LowerMenu />
      </div>
    </>
  );
}

export default ExploreDrinks;
