import React, { useEffect } from 'react';
import PropTypes from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import headerBarByPathname from '../../helpers/headerBarByPathname';
import arrowLeft from '../../images/arrowLeft.svg';
import '../../styles/TopHeaderBar.css';

function TopHeaderBar(props) {
  const history = useHistory();
  const { pathname } = useLocation();
  const [pageTitle, searchButton] = headerBarByPathname(pathname);
  const { toggleSearchBar: { searchBar, setSearchBar } } = props;

  function validToggle() {
    if (pathname.includes('/bebidas') || pathname.includes('/comidas')) {
      setSearchBar(false);
    }
    if (pathname.includes('/explorar') || pathname.includes('/perfil')
    || pathname.includes('/receitas')) {
      setSearchBar(false);
    }
  }
  useEffect(validToggle, [pathname, setSearchBar]);

  return (
    <div className="top-header-bar">
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
      <h5 className="pageTitle" data-testid="page-title">
        {pageTitle}
      </h5>
      <button
        type="button"
        data-testid="profile-top-btn"
        name="profile-top-btn"
        id="profile-top-btn"
        onClick={ () => history.push('/perfil') }
        src={ profileIcon }
      >
        <img className="altSvg" src={ profileIcon } alt="Ir para perfil" />
      </button>
      { searchButton
        ? (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ () => validToggle && setSearchBar(!searchBar) }
            src={ searchIcon }
          >
            <img className="altSvg" src={ searchIcon } alt="Abrir busca" />
          </button>) : null}
    </div>

  );
}

TopHeaderBar.propTypes = {
  toggleSearchBar: PropTypes.object,
}.isRequired;

export default TopHeaderBar;
