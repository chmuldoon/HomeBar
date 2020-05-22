
import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails } from "../../actions/cocktail_actions";
import Item from "./Item";
const Main = ({
  auth: { user },cocktails, logout, getUserCocktails
}) => {
  useEffect(() => {


    getUserCocktails()

  }, [getUserCocktails])

  return user === null ? (
    <div>loading</div>
  ) : (
    <div className="mainArea">
      <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt" />{" "}
      </a>
      <div className="content">
        <div className="drinkSection">
          {cocktails.map((drink) => (
            <div
            >
              <Item
                mustHave={user.mustHave}
                using={user.using2}
                key={drink.name}
                drink={drink}
              />
            </div>
          ))}
          ))}
        </div>
      </div>
    </div>
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