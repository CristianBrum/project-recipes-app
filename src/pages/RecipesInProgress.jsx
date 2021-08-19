import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import { setStorage, newDoneRecipe, getStorage } from '../helpers/Storage';
import ReturnRecipe from '../helpers/ReturnRecipe';
import ShareAndFavButtons from '../components/subcomponents/ShareAndFavButtons';
import { storageMeals, storageCocktails } from '../helpers/LocalStorageIngredients';
import '../styles/RecipesDetails.css';
import arrowLeft from '../images/arrowLeft.svg';
import RecipesContext from '../context/RecipesContext';

function RecipesInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const [loading, setLoading] = useState(true);
  const [returnedDetail, setReturnedDetail] = useState({});
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [doneRecipes] = useState(getStorage('doneRecipes'));
  const [typeFoods, setTypeFoods] = useState('');
  const [recipe, setRecipe] = useState('');
  const [inProgressRecipes, setInprogressRecipes] = useState();
  const [btnDoneRecipe, setBtnDoneRecipe] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [dones, setDones] = useState(false);

  const { linkCopied } = useContext(RecipesContext);

  const food = pathname.includes('comida');
  const drink = pathname.includes('bebida');

  const addDoneRecipe = () => {
    const newDoneRecip = newDoneRecipe(returnedDetail, typeFoods);
    const saveLocalStorage = getStorage('inProgressRecipes');
    setStorage('doneRecipes', [...doneRecipes, newDoneRecip]);
    delete saveLocalStorage[recipe][id];
    setStorage('inProgressRecipes', saveLocalStorage);
  };

  useEffect(() => {
    const saveLocalStorage = getStorage('inProgressRecipes');
    const done = getStorage('doneRecipes');
    done.forEach((recip) => { if (recip.id === id) { setDones(true); } });
    setInprogressRecipes(saveLocalStorage);
  }, [id]);

  useEffect(() => {
    async function recipesReturn() {
      const { fetchDetails, typeFood,
        recipeType, ingredientsList } = await ReturnRecipe(id, food, drink);
      setReturnedDetail(fetchDetails);
      setTypeFoods(typeFood);
      setRecipe(recipeType);
      setArrayIngredients(ingredientsList);
      setLoading(false);
    }
    recipesReturn();
  }, [food, drink, id]);

  function valueIngredients({ target }) {
    if (food) {
      const savedata = ((storageMeals(food, target.id, id)));
      setCheckedIngredients(savedata);
    } else {
      const savedata = ((storageCocktails(drink, target.id, id)));
      setCheckedIngredients(savedata);
    }
  }

  useEffect(() => {
    function disable() {
      if (checkedIngredients.length
        === arrayIngredients.length) {
        return false;
      }
      return true;
    }
    setBtnDoneRecipe(disable());
  }, [arrayIngredients, checkedIngredients]);

  const renderRecipe = () => (
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
          {pathname.includes('comidas') ? returnedDetail.strMeal
            : returnedDetail.strDrink}
        </h3>
        <div className="share-heart">
          <ShareAndFavButtons details={ returnedDetail } />
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
                data-testid="recipe-photo"
                alt="Thumb Recipe"
                src={ pathname.includes('comidas')
                  ? returnedDetail.strMealThumb
                  : returnedDetail.strDrinkThumb }
              />
              <div className="details-header">
                <h5 data-testid="recipe-title">
                  { food
                    ? returnedDetail.strMeal
                    : returnedDetail.strDrink}
                </h5>
                <h5 data-testid="recipe-category">{returnedDetail.strCategory}</h5>
              </div>
            </div>

            <section className="ingredients-container">
              <h3>Ingredientes</h3>
              {arrayIngredients.map((ingredient, index) => (
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                >
                  { (!!inProgressRecipes[recipe][id] && inProgressRecipes[recipe][id]
                    .includes(ingredient)) ? <input
                      id={ ingredient }
                      type="checkbox"
                      key={ index }
                      onClick={ (e) => valueIngredients(e) }
                      defaultChecked
                    /> : <input
                      id={ ingredient }
                      type="checkbox"
                      key={ index }
                      onClick={ (e) => valueIngredients(e) }
                    />}
                  <span>
                    {ingredient}
                  </span>
                </label>))}
            </section>
            <div className="instructions-containers">
              <h3>Instruções</h3>
              <p data-testid="instructions">{returnedDetail.strInstructions}</p>
            </div>
          </>)}
      {!dones ? (
        <button
          type="button"
          className="button-finish"
          alt="Finish-Recipe"
          onClick={ () => { addDoneRecipe(); history.push('/receitas-feitas'); } }
          data-testid="finish-recipe-btn"
          disabled={ btnDoneRecipe }
        >
          Finalizar Receita
        </button>
      ) : (
        <h3 className="done-recep">Receita Feita!!</h3>)}
    </section>
  );
  return (
    renderRecipe()
  );
}

export default RecipesInProgress;
