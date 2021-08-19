import React, { useEffect, useState, useContext } from 'react';
import '../styles/FiltersCategories.css';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function FiltersCategories() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [categories, setCategories] = useState([]);
  const { setCompare, setLoading, setDataFilter } = useContext(RecipesContext);
  const [resetFilter, setResetFilter] = useState('');

  useEffect(() => {
    const requisitionFilters = async () => {
      const cinco = 5;
      if (pathname === '/comidas') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const responseFoods = await response.json();
        const { meals } = responseFoods;
        return setCategories(meals.slice(0, cinco));
      }
      if (pathname === '/bebidas') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const responseDrinks = await response.json();
        const { drinks } = responseDrinks;
        return setCategories(drinks.slice(0, cinco));
      }
    };
    requisitionFilters();
  }, [pathname]);

  async function categoryFilter(target) {
    const doze = 12;
    if (pathname === '/comidas') {
      setLoading(true);
      const ConsultAPICategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.name}`);
      const response = await ConsultAPICategories.json();
      const { meals } = response;
      setCompare(!meals ? [] : meals.slice(0, doze));
      setLoading(false);
    }
    if (pathname === '/bebidas') {
      setLoading(true);
      const ConsultAPICategories = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.name}`);
      const response = await ConsultAPICategories.json();
      const { drinks } = response;
      setCompare(!drinks ? [] : drinks.slice(0, doze));
      setLoading(false);
    }
  }

  function resetSetFilter({ target }) {
    if (resetFilter === target.name && pathname === '/comidas') {
      setResetFilter('');
      setDataFilter([]);
    }
    if (resetFilter === target.name && pathname === '/bebidas') {
      setResetFilter('');
      setDataFilter([]);
    }
    if (resetFilter !== target.name) {
      setResetFilter(target.name);
      categoryFilter(target);
    }
  }

  async function returnAll() {
    setDataFilter([]);
  }

  return (
    <div className="container-categories">
      <button
        data-testid="All-category-filter"
        onClick={ () => returnAll() }
        className="button-categories"
        type="button"
      >
        All
      </button>
      { categories.map((category, index) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          className="button-categories"
          type="button"
          name={ category.strCategory }
          key={ index }
          onClick={ (e) => resetSetFilter(e) }
        >
          {category.strCategory.split(/[ /]/, 1)}
        </button>))}
    </div>
  );
}

export default FiltersCategories;
