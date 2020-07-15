
import React, { useEffect, Fragment, useState, Component, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails, clearCocktails } from "../../actions/cocktail_actions";
import CocktailsIndex from "./CocktailsIndex";
import UsingArea from "./UsingArea";
import { fetchUserLists, addMustHave, removeMustHave } from "../../actions/ingredient_actions";
import { Link } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";
import Tequila from "../major/Tequila";
import Vodka from "../major/Vodka";
import TripleSec from "../major/TripleSec";
import Gin from "../major/Gin";
import uuid from "react-uuid";

import Slider from "react-smooth-range-input";

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value
  }, [value]);
  return ref.current
}

const Main = ({
  auth: { user, loading },
  cocktails: {cocktails, loading:  cLoading },
  logout,
  getUserCocktails,
  clearCocktails,
  fetchUserLists,
  ingredients: {mustHave, ingredients, loading: iLoading },
  addMustHave,
  removeMustHave,
}) => {
    const [filter, setFilter] = useState(3);
    const [mainAlc, setMainAlc] = useState([])
    const [auxloading, setAuxLoading] = useState(false)

  useEffect(() => {
    fetchUserLists();
    getUserCocktails();
    return () => {
      clearCocktails();
    };
  }, [getUserCocktails]);
  let totalLoading = loading || iLoading || cLoading
  const prevCocktails = usePrevious(cocktails)
  
 
  const handleChange = num => {
    setAuxLoading(true)
    setFilter(num)
    setTimeout(() => {
    setAuxLoading(false)
    }, 50)
  }
  const handleMainAlc = id => {
    setAuxLoading(true);

    let ids = mainAlc.slice()
    if(ids.includes(id)){
      let idx = ids.indexOf(id)
      let newIds = ids.slice(0,idx).concat(ids.slice(idx + 1))
      setMainAlc(newIds);
    }else{
      ids.push(id)
      setMainAlc(ids)
    }
    setTimeout(() => {
      setAuxLoading(false);
    }, 50);
  }
  const sorted = (drinks) => {
    let ings = Object.keys(ingredients);
    drinks = drinks.sort((a, b) => _rank(ings, a.using2) - _rank(ings, b.using2));
    drinks = drinks.filter(c => _rank(ings, c.using2) <= filter)
    mainAlc.forEach(el => {
      drinks = drinks.filter(c => c.using2.includes(el))
    })
    // setLength(drinks.length)
    return drinks

  };
  const sideInfo = () => {
    let ings = Object.keys(ingredients);
    const drinks = sorted(cocktails)
    const complete = drinks.filter(c => _rank(ings, c.using2) === 0)
    const mapZeroToThree = [0, 1, 2, 3].map(el => {
      let count = drinks.filter((c) => _rank(ings, c.using2) === el).length
      if(el === 0) return <p key={uuid()}>{count} cocktails you can make right now</p>
      return <p key={uuid()}>{count} cocktails you are {el} ingredients away from</p>
    })
    return (
      <div>
        {mapZeroToThree}
      </div>
    );
  }
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
        <title>Home Bar • Cocktails</title>
        <Card
          style={{
            height: "25rem",
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
              onClick={() => handleMainAlc("5e9d51a19a6bb767c4002b9e")}
            >
              <Vodka
                used={keys.includes("5e9d51a19a6bb767c4002b9e")}
                dimension="30px"
              />
              vodka
            </div>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={() => handleMainAlc("5e9d51a19a6bb767c4002ba1")}
            >
              <Tequila
                used={keys.includes("5e9d51a19a6bb767c4002ba1")}
                dimension="30px"
              />
              tequila
            </div>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={() => handleMainAlc("5e9d51a19a6bb767c4002b9f")}
            >
              <Gin
                used={keys.includes("5e9d51a19a6bb767c4002b9f")}
                dimension="30px"
              />
              gin
            </div>
            <div
              style={{ textTransform: "capitalize" }}
              onClick={() => handleMainAlc("5e9d51a29a6bb767c4002d24")}
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
            {sideInfo()}
          </Card.Body>
        </Card>
      </div>
    );
  };
  return (
    <Fragment>
      
      {totalLoading === null || auxloading ? (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        {() =>getUserCocktails()}
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
      </Fragment>
      )}
      {mustHave && filterCard(mainAlc)}
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
  ingredients: state.ingredients,
  cocktails: state.cocktails
});

export default connect(mapStateToProps, {
  logout,
  getUserCocktails,
  fetchUserLists,
  addMustHave,
  clearCocktails,
  removeMustHave,
})(Main);