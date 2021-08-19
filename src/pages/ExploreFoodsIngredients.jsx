import React, { useContext, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import RecipesContext from '../context/RecipesContext';
import { FoodsIngredients, FoodsByIngredients } from '../services/API';
import '../styles/recipesCard.css';

function ExploreFoodsIngredients() {
  const { setCompare, loading,
    setLoading, compare, setFoodsByItem } = useContext(RecipesContext);

  useEffect(() => {
    setLoading(true);
    const fetchFoodsIngredients = async () => {
      const response = await FoodsIngredients();
      const MAX = 12;
      const results = response.slice(0, MAX);
      setLoading(false);
      setCompare(results);
    };
    fetchFoodsIngredients();
  }, [setCompare, setLoading]);

  const fetchFoodsByIngredients = async (strIngredient) => {
    const response = await FoodsByIngredients(strIngredient);
    const MAX = 12;
    setFoodsByItem(response.slice(0, MAX));
  };

  return (
    <>
      <Header />
      <section className="recipes-container">
        {loading ? <ReactBootStrap.Spinner animation="border" />
          : compare.map(({ strIngredient }, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <Link
                to="/comidas"
                onClick={ () => fetchFoodsByIngredients(strIngredient) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ strIngredient }
                  width="200px"
                />
                <p
                  className="card-name"
                  data-testid={ `${index}-card-name` }
                >
                  {strIngredient}
                </p>
              </Link>
            </div>
          ))}
      </section>
      <LowerMenu />
    </>
  );
}
export default ExploreFoodsIngredients;
