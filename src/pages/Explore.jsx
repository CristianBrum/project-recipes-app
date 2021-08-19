import React from 'react';
import { useHistory } from 'react-router';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import '../styles/Explore.css';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header />
      <div className="explore">
        <button
          className="button-categories"
          data-testid="explore-food"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          className="button-categories"
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <LowerMenu />
    </>
  );
}

export default Explore;
