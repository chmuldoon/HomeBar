
import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails } from "../../actions/cocktail_actions";
import CocktailsIndex from "./CocktailsIndex";
import Navbar from "./Navbar";
const Main = ({
  auth: { user },cocktails, logout, getUserCocktails
}) => {


  useEffect(() => {


    getUserCocktails()

  }, [getUserCocktails])

  return user === null ? (
    <div>loading</div>
  ) : (
    <Fragment>
      <Navbar/>
      <div className="mainArea">
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
        </a>
        <div className="content">
          <CocktailsIndex
            cocktails={cocktails}
            mustHave={user.mustHave}
            using={user.ingredients}
          />
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
  cocktails: state.cocktails.cocktails
});

export default connect(mapStateToProps, { logout, getUserCocktails })(Main);