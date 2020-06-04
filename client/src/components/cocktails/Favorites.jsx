import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import CocktailsIndex from '../main/CocktailsIndex'
import {getUserFavorites, removeFavorite} from '../../actions/cocktail_actions'
import {fetchUserLists} from '../../actions/ingredient_actions'

const Favorites = ({ getUserFavorites, auth: {user},cocktails,ingredients, using, mustHave, removeFavorite}) => {
  useEffect(() => {
    getUserFavorites()
    fetchUserLists()
  }, [getUserFavorites, fetchUserLists])
  if(!user){
    return <p>loading</p>
  }
  return (
    <div className="mainArea">
      <div className="content">
        {cocktails && ingredients && (
          <CocktailsIndex
            cocktails={cocktails}
            using={Object.keys(ingredients)}
            mustHave={Object.keys(mustHave)}
            favorites={user.favorites}
            favoritesPage={true}
          />
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  ingredients: state.ingredients.ingredients,
  mustHave: state.ingredients.mustHave,
  cocktails: state.cocktails.cocktails,
});

export default connect(mapStateToProps, {getUserFavorites, fetchUserLists, removeFavorite})(Favorites)
