import React from 'react';
import PropTypes from 'prop-types';

function DropdownAreas(props) {
  const { totalAreas, fetchAreas } = props;
  return (
    <label className="select-dropdwon" htmlFor="area">
      <select
        name="area"
        id="area"
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target: { value } }) => fetchAreas(value) }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        { totalAreas.map(({ strArea }) => (
          <option
            value={ strArea }
            data-testid={ `${strArea}-option` }
            key={ strArea }
          >
            { strArea }
          </option>)) }

      </select>
    </label>
  );
}

DropdownAreas.propTypes = {
  totalAreas: PropTypes.array,
  fetchAreas: PropTypes.func,
}.isRequired;

export default DropdownAreas;
