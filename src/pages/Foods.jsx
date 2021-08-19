import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import { fetchFoods } from '../services/API';
import RecipesContext from '../context/RecipesContext';
import FiltersCategories from '../components/FiltersCategories';

function Foods() {
  const { setFoods,
    dataFilter, foods, compare, setDataFilter,
    setCompare, loading, setLoading,
    foodsByItem, searchBar } = useContext(RecipesContext);

  const MAX = 12;

  useEffect(() => {
    setLoading(true);
    const fetchFood = async () => {
      const response = await fetchFoods();
      const results = response;
      setLoading(false);
      setFoods(results);
    };
    fetchFood();
  }, [setFoods, setLoading]);

  useEffect(() => {
    const renderItens = () => {
      if (foodsByItem.length > 1) {
        return setCompare(foodsByItem);
      }
      if (dataFilter.length === 0) {
        return setCompare(foods);
      }
      return setCompare(dataFilter);
    };
    renderItens();
  }, [setCompare, foods, dataFilter, foodsByItem, setDataFilter]);

  return (
    <>
      { dataFilter && dataFilter.length
        === 1 && <Redirect to={ `/comidas/${dataFilter[0].idMeal}` } />}
      <Header />
      {searchBar ? null : <FiltersCategories /> }
      <section className="recipes-container">
        {loading ? <ReactBootStrap.Spinner animation="border" />
          : compare.slice(0, MAX).map((food, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <Link to={ `/comidas/${food.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  width="200px"
                />
                <p
                  className="card-name"
                  data-testid={ `${index}-card-name` }
                >
                  {food.strMeal}
                </p>
              </Link>
            </div>
          ))}
      </section>
      <LowerMenu />
    </>
  );
}

export default Foods;
