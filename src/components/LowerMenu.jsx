import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LowerMenu.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import RecipesContext from '../context/RecipesContext';

function LowerMenu() {
  const { setDataFilter } = useContext(RecipesContext);
  function clearFilteredState() {
    setDataFilter([]);
  }

  return (
    <footer data-testid="footer">
      <Link to="/bebidas" onClick={ clearFilteredState }>
        <img
          className="altSvg"
          data-testid="drinks-bottom-btn"
          alt="Drink"
          src={ drinkIcon }
        />
      </Link>
      <Link to="/explorar">
        <img
          className="altSvg"
          data-testid="explore-bottom-btn"
          alt="Explorer"
          src={ exploreIcon }
        />
      </Link>
      <Link to="/comidas" onClick={ clearFilteredState }>
        <img
          className="altSvg"
          data-testid="food-bottom-btn"
          alt="Food"
          src={ mealIcon }
        />
      </Link>
    </footer>
  );
}

export default LowerMenu;
