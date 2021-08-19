import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import { fetchFoodDetails, fetchDrinks } from '../services/API';
import '../styles/RecipesDetails.css';
import ingredientsDetails from '../helpers/ingredientsDetails';
import DrinksRecomendations from '../components/DrinksRecomendations';
import { getStorage, setStorage } from '../helpers/Storage';
import ShareAndFavButtons from '../components/subcomponents/ShareAndFavButtons';
import RecipesContext from '../context/RecipesContext';
import arrowLeft from '../images/arrowLeft.svg';

function FoodsDetails() {
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
    const foodDetails = async (foodId) => {
      const fetchedDetails = await fetchFoodDetails(foodId);
      setDetails(fetchedDetails);
      setLoading(false);
    };
    foodDetails(id);
  }, [id, setLoading]);

  useEffect(() => {
    const drinksRecomendations = async () => {
      const fetchedRecomendations = await fetchDrinks();
      setRecomendations(fetchedRecomendations);
    };
    drinksRecomendations();
  }, []);

  useEffect(() => {
    const doneRecipes = getStorage('doneRecipes');
    doneRecipes.forEach((recipe) => { if (recipe.id === id) { setDoneRecipe(true); } });

    const { meals } = getStorage('inProgressRecipes');
    if (meals && Object.keys(meals).includes(id)) {
      setInProgressRecipe(true);
    }
  }, [id]);

  const ingredientsAndMeasures = details.idMeal
    ? ingredientsDetails(details)
    : [];

  function videoSrc(youtubeLink) {
    return youtubeLink.replace('watch?v=', 'embed/');
  }

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
          {details.strMeal}
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
                src={ details.strMealThumb }
                alt="Detalhe da comida"
                data-testid="recipe-photo"
              />
              <div className="details-header">
                <h5 data-testid="recipe-title">{details.strMeal}</h5>
                <h5 data-testid="recipe-category">{details.strCategory}</h5>
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
            <div className="video-container">
              <h3 className="video-title">Vídeo</h3>
              <iframe
                data-testid="video"
                width="300"
                height="240"
                src={ videoSrc(details.strYoutube) }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="recomendation-container">
              <h3 className="recomendation-title">Recomendadas</h3>
              <DrinksRecomendations recomendations={ recomendations } />
            </div>
          </>
        )}

      {!doneRecipe ? (
        <button
          className="btn-details"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        >
          {inProgressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      ) : (
        <h3 className="done-recep">Receita Feita!!</h3>)}

    </section>
  );
}

export default FoodsDetails;
