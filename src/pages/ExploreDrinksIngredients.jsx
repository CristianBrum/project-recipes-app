import React, { useContext, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import RecipesContext from '../context/RecipesContext';
import { DrinksIngredients, DrinksByIngredients } from '../services/API';
import '../styles/recipesCard.css';

function ExploreDrinksIngredients() {
  const { setCompare, loading,
    setLoading, compare, setDrinksByItem } = useContext(RecipesContext);

  useEffect(() => {
    setLoading(true);
    const fetchDrinksIngredients = async () => {
      const response = await DrinksIngredients();
      const MAX = 12;
      const results = response.slice(0, MAX);
      setLoading(false);
      setCompare(results);
    };
    fetchDrinksIngredients();
  }, [setCompare, setLoading]);

  const fetchDrinksByIngredients = async (strIngredient1) => {
    const response = await DrinksByIngredients(strIngredient1);
    const MAX = 12;
    setDrinksByItem(response.slice(0, MAX));
  };

  return (
    <>
      <Header />
      <section className="recipes-container">
        {loading ? <ReactBootStrap.Spinner animation="border" />
          : compare.map(({ strIngredient1 }, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <Link
                to="/bebidas"
                onClick={ () => fetchDrinksByIngredients(strIngredient1) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                  width="200px"
                />
                <p
                  className="card-name"
                  data-testid={ `${index}-card-name` }
                >
                  {strIngredient1}
                </p>
              </Link>
            </div>
          ))}
      </section>
      <LowerMenu />
    </>
  );
}

export default ExploreDrinksIngredients;
