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
    </header>
  );
}

export default Header;
