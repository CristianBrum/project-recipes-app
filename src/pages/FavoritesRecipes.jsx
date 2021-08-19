import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/FavoritesRecipes.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import { getStorage, setStorage } from '../helpers/Storage';

function FavoritesRecipes() {
  const history = useHistory();
  const [linkCopied, setLinkCopied] = useState('');

  function favoritesRecipe() {
    const storage = getStorage('favoriteRecipes');
    return storage || [];
  }
  const [FavoriteRecipes, setFavoriteRecipes] = useState(favoritesRecipe());

  useEffect(() => {
    setFavoriteRecipes(favoritesRecipe());
  }, []);

  function copyUrlToClipboard() {
    const { type, id } = FavoriteRecipes[0];
    setLinkCopied('Link copiado!');
    navigator.clipboard.writeText(window.location.href
      .replace('receitas-favoritas', `${type}s/${id}`));
  }

  function mealInfo(index, category, area) {
    return (
      <p
        className="done-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${area} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p
        className="done-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${alcoholicOrNot}`}
      </p>
    );
  }

  function deletes(id) {
    const filtered = FavoriteRecipes.filter((item) => item.id !== id);
    setStorage('favoriteRecipes', filtered);
    setFavoriteRecipes(filtered);
  }

  return (
    <>
      <Header />
      <div className="buttonfilter-container">
        <button
          className="btn-filter"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(favoritesRecipe()) }
        >
          All
        </button>
        <button
          className="btn-filter"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(
            favoritesRecipe().filter((data) => data.type === 'comida'),
          ) }
        >
          Food
        </button>
        <button
          className="btn-filter"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(
            favoritesRecipe().filter((data) => data.type === 'bebida'),
          ) }
        >
          Drink
        </button>
      </div>
      <p className="link">
        {linkCopied}
      </p>
      <section className="done-recipes-container">
        {FavoriteRecipes.length === 0
          ? <h3 className="msg">Sem receitas favoritas!</h3> : FavoriteRecipes.map((
            { category,
              id, type, image, area, alcoholicOrNot, name }, index,
          ) => (
            <div
              className="done-recipe-cards"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <Link to={ `/${type}s/${id}` }>
                <img
                  className="recipe-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
              </Link>
              <div className="infos">
                {type === 'comida' ? mealInfo(index, category, area)
                  : drinkInfo(index, alcoholicOrNot)}
                <Link to={ `/${type}s/${id}` }>
                  <p className="name" data-testid={ `${index}-horizontal-name` }>
                    {name}
                  </p>
                </Link>
                <div className="icons">
                  <button
                    type="button"
                    className="share"
                    data-testid="share-btn"
                    onClick={ () => copyUrlToClipboard() }
                  >
                    <img
                      src={ shareIcon }
                      alt="share-icon"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  <button
                    data-testid="heart-btn"
                    className="heart"
                    type="button"
                    onClick={ () => deletes(id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="Botão desfavoritar"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="buttons-aux">
          <button
            onClick={ () => history.push('/comidas') }
            type="button"
          >
            Buscar Novas Receitas
          </button>
        </div>
      </section>
    </>
  );
}

export default FavoritesRecipes;
