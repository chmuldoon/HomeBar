
import React, { useEffect, Fragment, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails } from "../../actions/cocktail_actions";
import CocktailsIndex from "./CocktailsIndex";
import UsingArea from "./UsingArea";
import { fetchUserLists, addMustHave, removeMustHave } from "../../actions/ingredient_actions";
import { Link } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";
import Tequila from "../major/Tequila";
import Vodka from "../major/Vodka";
import TripleSec from "../major/TripleSec";
import Gin from "../major/Gin";
import Slider from "react-smooth-range-input";



const Main = ({
  auth: { user },
  cocktails,
  logout,
  getUserCocktails,
  fetchUserLists,
  ingredients,
  mustHave,
  addMustHave,
  removeMustHave,
}) => {
    const [filter, setFilter] = useState(3);

  useEffect(() => {
    fetchUserLists();
    getUserCocktails();

    
  }, [getUserCocktails, fetchUserLists, cocktails]);
  const handleClick = (e, keys) => {
    debugger
    const info = e.currentTarget.textContent.split(",");
    let kind = info[0];
    let id = info[1];
    if (keys.includes(id)) {
      // setFilter({ ...filter, [kind]: false });
      removeMustHave(id)
    } else {
      // setFilter({ ...filter, [kind]: true });
      addMustHave(id)
    }
  };
  const handleChange = num => {
    setFilter(num)

  }
  const sorted = (drinks) => {
    let ings = Object.keys(ingredients);
    drinks = drinks.sort((a, b) => _rank(ings, a.using2) - _rank(ings, b.using2));
    drinks = drinks.filter(c => _rank(ings, c.using2) <= filter)
    // setLength(drinks.length)
    return drinks

  };
  const _rank = (list, using) => {
    let count = 0;
    using.forEach((i) => {
      if (list.includes(i)) {
        count++;
      }
    });
    return using.length - count;
  };
  const filterCard = (keys) => {
    let count = null
    if(document.querySelector(".drinkSection")){
      count = document.querySelector(".drinkSection").childElementCount
    }
    return (
      <div className="hide-sm">
        <Card
          style={{
            height: "20rem",
            position: "fixed",
            zIndex: "10",
            right: "0",
            marginRight: "3rem",
          }}
        >
          <Card.Body>
            <Card.Title>Filter by popular Alcohol</Card.Title>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={(e) => handleClick(e, keys)}
            >
              <Vodka
                used={keys.includes("5e9d51a19a6bb767c4002b9e")}
                dimension="30px"
              />
              vodka
            </div>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={(e) => handleClick(e, keys)}
            >
              <Tequila
                used={keys.includes("5e9d51a19a6bb767c4002ba1")}
                dimension="30px"
              />
              tequila
            </div>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={(e) => handleClick(e, keys)}
            >
              <Gin
                used={keys.includes("5e9d51a19a6bb767c4002b9f")}
                dimension="30px"
              />
              gin
            </div>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={(e) => handleClick(e, keys)}
            >
              <TripleSec
                used={keys.includes("5e9d51a29a6bb767c4002d24")}
                dimension="30px"
              />
              tripleSec
            </div>
            <Card.Title>Maximum Ingredients Needed</Card.Title>
            <Slider
              value={filter}
              min={0}
              max={10}
              onChange={(num) => handleChange(num)}
            />
            {count && `${count} Cocktails`}
          </Card.Body>
        </Card>
      </div>
    );
  };
  return user === null ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Fragment>
      {cocktails && ingredients && (
        <CocktailsIndex
          cocktails={sorted(cocktails)}
          using={Object.keys(ingredients)}
          mustHave={Object.keys(mustHave)}
          favorites={user.favorites}
          favoritesPage={false}
        />
        )}
        {mustHave && filterCard(Object.keys(mustHave))} 
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

export default connect(mapStateToProps, {
  logout,
  getUserCocktails,
  fetchUserLists,
  addMustHave,
  removeMustHave,
})(Main);