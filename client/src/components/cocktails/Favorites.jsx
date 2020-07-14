import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import CocktailsIndex from '../main/CocktailsIndex'
import {
  getUserFavorites,
  removeFavorite,
  clearCocktails,
  clearCocktail,
} from "../../actions/cocktail_actions";
import {fetchUserLists} from '../../actions/ingredient_actions'
import Select from "react-select";
const Favorites = ({
  getUserFavorites,
  auth: { user },
  cocktails,
  fetchUserLists,
  ingredients,
  clearCocktails,
  using,
  mustHave,
  removeFavorite,
}) => {
  useEffect(() => {
    clearCocktail();
    getUserFavorites();
    fetchUserLists();
  }, []);
  if (!user) {
    return <p>loading</p>;
  }
  debugger
  return (
    <div className="mainArea">
      {cocktails && ingredients && (
        <CocktailsIndex
          // wait={1000}
          cocktails={cocktails}
          using={Object.keys(ingredients)}
          mustHave={Object.keys(mustHave)}
          favorites={user.favorites}
          favoritesPage={true}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  ingredients: state.ingredients.ingredients,
  mustHave: state.ingredients.mustHave,
  cocktails: state.cocktails.cocktails,
});

export default connect(mapStateToProps, {getUserFavorites, clearCocktails, fetchUserLists, removeFavorite})(Favorites)
