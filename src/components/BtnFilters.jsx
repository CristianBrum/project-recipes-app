// import React, { useState } from 'react';
// import '../styles/DoneRecipes.css';
// import { foodsDone, drinksDone, allDone } from '../helpers/ApiFunctions';

// function BtnFilters() {
//   const { setDoneRecipes, doneRecipes, recipesDone } = useState;
//   return (
//     <div className="buttonfilter-container">
//       <button
//         className="btn-filter"
//         data-testid="filter-by-all-btn"
//         type="button"
//         onClick={ () => allDone(doneRecipes, setDoneRecipes, recipesDone) }
//       >
//         All
//       </button>
//       <button
//         className="btn-filter"
//         data-testid="filter-by-food-btn"
//         type="button"
//         onClick={ () => foodsDone() }
//       >
//         Food
//       </button>
//       <button
//         className="btn-filter"
//         data-testid="filter-by-drink-btn"
//         type="button"
//         onClick={ () => { drinksDone(setDoneRecipes, doneRecipes); } }
//       >
//         Drink
//       </button>
//     </div>
//   );
// }

// export default BtnFilters;
