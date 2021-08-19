import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import { fetchDrinksDetails, fetchFoods } from '../services/API';
import '../styles/RecipesDetails.css';
import ingredientsDetails from '../helpers/ingredientsDetails';
import FoodsRecomendations from '../components/FoodsRecomendations';
import { getStorage, setStorage } from '../helpers/Storage';
import ShareAndFavButtons from '../components/subcomponents/ShareAndFavButtons';
import RecipesContext from '../context/RecipesContext';
import arrowLeft from '../images/arrowLeft.svg';

function DrinksDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({ id });
  const [recomendations, setRecomendations] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const history = useHistory();

  const { linkCopied } = useContext(RecipesContext);

  if (!localStorage.inProgressRecipes) {
    setStorage('inProgressRecipes', ({
      cocktails: {},
      meals: {},
    }));
  }
  useEffect(() => {
    const foodDetails = async (drinkId) => {
      const fetchedDetails = await fetchDrinksDetails(drinkId);
      setDetails(fetchedDetails);
      setLoading(false);
    };
    foodDetails(id);
  }, [id, setLoading]);

  useEffect(() => {
    const foodsRecomendations = async () => {
      const fetchedRecomendations = await fetchFoods();
      setRecomendations(fetchedRecomendations);
    };
    foodsRecomendations();
  }, []);

  useEffect(() => {
    const doneRecipes = getStorage('doneRecipes');
    doneRecipes.forEach((recipe) => { if (recipe.id === id) { setDoneRecipe(true); } });

    const { cocktails } = getStorage('inProgressRecipes');
    if (cocktails && Object.keys(cocktails).includes(id)) {
      setInProgressRecipe(true);
    }
  }, [id]);

  const ingredientsAndMeasures = details.idDrink
    ? ingredientsDetails(details) : [];

  return (
    <section className="details-container">
      <div className="header-buttons">
        <button
          className="btn-return"
          onClick={ () => { window.history.back(); } }
          type="button"
        >
          <img
            className="altSvg"
            data-testid="explore-bottom-btn"
            alt="Explorer"
            src={ arrowLeft }
            width="30px"
          />
        </button>
        <h3 className="titles">
          {details.strDrink}
        </h3>
        <div className="share-heart">
          <ShareAndFavButtons details={ details } />
        </div>
      </div>
      {loading ? (
        <ReactBootStrap.Spinner animation="border" />
      )
        : (
          <>
            <div className="recipe-cardDetail">
              <p className="link">
                {linkCopied}
              </p>
              <img
                className="img-recipe"
                src={ details.strDrinkThumb }
                alt="Detalhe da bebida"
                data-testid="recipe-photo"
              />
              <div className="details-header">
                <h5 data-testid="recipe-title">{details.strDrink}</h5>
                <h5 data-testid="recipe-category">{details.strAlcoholic}</h5>
              </div>
            </div>
            <section className="ingredients-container">
              <h3>Ingredientes</h3>
              <ul>
                {ingredientsAndMeasures.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>
            <div className="instructions-container">
              <h3>Instruções</h3>
              <p data-testid="instructions">{details.strInstructions}</p>
            </div>
            <div className="recomendation-container">
              <h3 className="recomendation-title">Recomendadas</h3>
              <FoodsRecomendations recomendations={ recomendations } />
            </div>
          </>)}
      {!doneRecipe ? (
        <button
          className="btn-details"
          type="button"
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        >
          {inProgressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      ) : (
        <h3 className="done-recep">Receita Feita!!</h3>)}
    </section>
  );
}

export default DrinksDetails;
