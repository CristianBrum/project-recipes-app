import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getStorage, setStorage, newFavoriteRecipes } from '../../helpers/Storage';
import RecipesContext from '../../context/RecipesContext';

function ShareAndFavButtons(props) {
  const { details } = props;
  const { id } = useParams();
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  const { setLinkCopied } = useContext(RecipesContext);

  useEffect(() => {
    const favorites = getStorage('favoriteRecipes');
    favorites.forEach((favorite) => { if (favorite.id === id) { setFavorited(true); } });
  }, [id]);

  function copyUrlToClipboard() {
    setLinkCopied('Link copiado!');
    navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''));
  }

  const addOrRemoveFavoriteRecipe = () => {
    const favoriteRecipes = getStorage('favoriteRecipes');
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
      setFavorited(false);
      setStorage('favoriteRecipes', favoriteRecipes.filter((recipe) => recipe.id !== id));
    } else {
      const foodType = pathname.includes('comida') ? 'comida' : 'bebida';
      setFavorited(true);
      const newFavoriteRecip = newFavoriteRecipes(details, foodType);
      setStorage('favoriteRecipes', [...favoriteRecipes, newFavoriteRecip]);
    }
  };

  return (
    <>
      <button
        className="shares"
        type="button"
        data-testid="share-btn"
        onClick={ () => copyUrlToClipboard() }
      >
        <img src={ shareIcon } alt="Botão compartilhar" />
      </button>
      <button
        type="button"
        className="white-heart"
        data-testid="favorite-btn"
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => addOrRemoveFavoriteRecipe() }
      >
        <img
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="Botão favoritar"
        />
      </button>
    </>
  );
}

ShareAndFavButtons.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default ShareAndFavButtons;
