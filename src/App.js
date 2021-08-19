import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './helpers/Routes';
import RecipesProvider from './context/RecipesProvider';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
    </HashRouter>
  );
}

export default App;
