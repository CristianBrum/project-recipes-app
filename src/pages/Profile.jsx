import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import '../styles/Explore.css';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  function getEmail() {
    return (
      <p type="text" data-testid="profile-email">
        {user.email}
      </p>
    );
  }
  return (
    <>
      <Header />
      <div className="explore">
        <p>
          {user && getEmail()}
        </p>
        <button
          className="button-categories"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          className="button-categories"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          className="button-categories"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
      </div>
      <LowerMenu />
    </>
  );
}

export default Profile;
