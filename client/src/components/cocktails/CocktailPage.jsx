import React, { Fragment, useEffect } from 'react'
import Navbar from '../main/Navbar';
import { getCocktail, addFavorite, removeFavorite } from '../../actions/cocktail_actions';
import { connect } from 'react-redux';
const CocktailPage = ({match, drink, getCocktail, addFavorite, removeFavorite, loading, auth:{user}}) => {
  useEffect(() => {
    getCocktail(match.params.id)
  });
  
  return loading ? (
    <p>loading</p>
  ) : (
    drink && user && (
      <Fragment>
        <div className="mainArea">
          <div className="content">
            <div className="cocktailPage">
              <img
                src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
                alt=""
              />
              <div>
                {user.favorites.includes(drink._id) ? (
                  <i
                    className="fas fa-star"
                    onClick={() => removeFavorite(drink._id, false)}
                    style={{ color: "yellow" }}
                  />
                ) : (
                  <i
                    className="far fa-star"
                    onClick={() => addFavorite(drink._id)}
                    style={{ color: "black" }}
                  />
                )}
                <b> {drink.name}</b>
                <p>{drink.instructions}</p>
                
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    drink: state.cocktails.cocktail,
    loading: state.cocktails.loading
  }
} ;

export default connect(mapStateToProps, {getCocktail, addFavorite, removeFavorite})(CocktailPage)
