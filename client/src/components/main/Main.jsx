
import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails } from "../../actions/cocktail_actions";
import CocktailsIndex from "./CocktailsIndex";
import Navbar from "./Navbar";
import UsingArea from "./UsingArea";
import { fetchUserLists } from "../../actions/ingredient_actions";

const Main = ({
  auth: { user },cocktails, logout, getUserCocktails, fetchUserLists, ingredients, mustHave
}) => {


  useEffect(() => {

    fetchUserLists()
    getUserCocktails()

  }, [getUserCocktails, fetchUserLists])
  const sorted = (drinks) => {
    debugger
    let ings = Object.keys(ingredients)
    return drinks.sort((a,b)  => _rank(ings, a.using2) - _rank(ings, b.using2))
  }
  const _rank = (list, using) => {
    let count = 0;
    using.forEach((i) => { if (list.includes(i)) { count++ }; });
    return  using.length - count
  };
  return user === null ? (
    <div>loading</div>
  ) : (
    <Fragment>
      <Navbar />
      <div className="mainArea">
        \
        <div className="content">
          {ingredients && (
            <UsingArea
              using={Object.values(ingredients)}
              mustHave={Object.values(mustHave)}
            />
          )}
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt" />{" "}
          </a>
          {cocktails && ingredients && (
            <CocktailsIndex
              cocktails={sorted(cocktails)}
              using={Object.keys(ingredients)}
              mustHave={Object.keys(mustHave)}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};


Main.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  // cocktails: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ingredients: state.ingredients.ingredients,
  mustHave: state.ingredients.mustHave,
  cocktails: state.cocktails.cocktails
});

export default connect(mapStateToProps, { logout, getUserCocktails, fetchUserLists })(Main);