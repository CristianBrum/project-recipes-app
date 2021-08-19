import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import '../styles/RecipesRecomendations.css';
import { Link } from 'react-router-dom';

function DrinksRecomendations(props) {
  const { recomendations } = props;
  const recomendationsNumber = 6;
  return (
    <Carousel>
      {recomendations.map((element, index) => {
        if (index < recomendationsNumber) {
          return (
            <Carousel.Item
              key={ element.idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <Link to={ `/bebidas/${element.idDrink}` }>
                <img
                  className="recipe-recom"
                  src={ element.strDrinkThumb }
                  alt="Bebida recomendada"
                />
                <p className="category">{element.strAlcoholic}</p>
                <p className="name" data-testid={ `${index}-recomendation-title` }>
                  {element.strDrink}
                </p>
              </Link>
            </Carousel.Item>
          );
        }
        return null;
      })}
    </Carousel>

  );
}

DrinksRecomendations.propTypes = ({
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
});

export default DrinksRecomendations;
