import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import SearchBar from './subcomponents/SearchBar';
import TopHeaderBar from './subcomponents/TopHeaderBar';

function Header() {
  const { searchBar, setSearchBar } = useContext(RecipesContext);
  return (
    <header>
      <TopHeaderBar
        toggleSearchBar={ { searchBar, setSearchBar } }
      />
      {searchBar ? <SearchBar /> : null}
      {/*  <h3 data-testid="page-title">{title}</h3> */}
    </header>
  );
}

export default Header;
