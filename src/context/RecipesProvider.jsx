import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { handleDrinks, handleFoods } from '../helpers/ApiFunctions';

function RecipesProvider({ children }) {
  const [searchText, setSearchText] = useState('');
  const [radioButton, setRadioButton] = useState(' ingrediente');
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [compare, setCompare] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drinksByItem, setDrinksByItem] = useState([]);
  const [foodsByItem, setFoodsByItem] = useState([]);
  const [searchBar, setSearchBar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [linkCopied, setLinkCopied] = useState('');

  const handleClick = (pathname) => (pathname === '/comidas'
    ? handleFoods(radioButton, searchText, setDataFilter, setLoading)
    : handleDrinks(radioButton, searchText, setDataFilter, setLoading));

  const recipesContextValue = {
    searchText,
    setSearchText,
    radioButton,
    setRadioButton,
    handleClick,
    drinks,
    setDrinks,
    foods,
    setFoods,
    dataFilter,
    compare,
    setCompare,
    loading,
    setLoading,
    drinksByItem,
    setDrinksByItem,
    foodsByItem,
    setFoodsByItem,
    setDataFilter,
    searchBar,
    setSearchBar,
    dropDown,
    setDropDown,
    linkCopied,
    setLinkCopied,
  };

  return (
    <RecipesContext.Provider value={ recipesContextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default RecipesProvider;
