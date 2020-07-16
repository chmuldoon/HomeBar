import React, { useEffect, useRef, Fragment } from 'react'
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
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

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
    getUserFavorites();
    fetchUserLists();
    return () => {
      clearCocktails()
    }
  }, []);
  const prev = usePrevious(cocktails)
  if (!user) {
    return <p>loading</p>;
  }
  return (
    <Fragment>
      <title>Home Bar • Favorites</title>

      {cocktails && ingredients && (
        <CocktailsIndex
          // wait={1000}
          user={user}
          cocktails={cocktails}
          using={Object.keys(ingredients)}
          mustHave={Object.keys(mustHave)}
          favorites={user.favorites}
          favoritesPage={true}
        />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  ingredients: state.ingredients.ingredients,
  mustHave: state.ingredients.mustHave,
  cocktails: state.cocktails.cocktails,
});

export default connect(mapStateToProps, {getUserFavorites, clearCocktails, fetchUserLists, removeFavorite})(Favorites)
