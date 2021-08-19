import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreFoodsArea from '../pages/ExploreFoodsArea';
import DrinksDetails from '../pages/DrinksDetails';
import NotFound from '../pages/NotFound';
import FoodsDetails from '../pages/FoodsDetails';
import RecipesInProgress from '../pages/RecipesInProgress';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
