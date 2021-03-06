
import React, { useEffect, Fragment, useState, Component, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails, clearCocktails } from "../../actions/cocktail_actions";
import CocktailsIndex from "./CocktailsIndex";
import UsingArea from "./UsingArea";
import { fetchUserLists, addMustHave, removeMustHave } from "../../actions/ingredient_actions";
import { Link } from "react-router-dom";
import { Spinner, Card, InputGroup, FormControl } from "react-bootstrap";
import Tequila from "../major/Tequila";
import Vodka from "../major/Vodka";
import TripleSec from "../major/TripleSec";
import Gin from "../major/Gin";
import uuid from "react-uuid";
import Draggable from "react-draggable";
import Slider from "react-smooth-range-input";
import Filter from "./Filter";

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
  location,
  getUserCocktails,
  clearCocktails,
  fetchUserLists,
  ingredients: {mustHave, ingredients, loading: iLoading },
  addMustHave,
  removeMustHave,
  well
}) => {
    const [filter, setFilter] = useState(3);
    const [mainAlc, setMainAlc] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [auxloading, setAuxLoading] = useState(false);


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
  const handleText = e => {
    const term = e.target.value;
    setAuxLoading(true);
    setSearchTerm(term)

    setTimeout(() => {
      setAuxLoading(false);
    }, 50);
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
    const condensed = searchTerm.trim()
    if(condensed.length > 0){
      drinks = drinks.filter(c => (
        c.name.toLowerCase().split().some((part) => part.startsWith(condensed.toLowerCase()))
      ))
    }
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

  
  return (
    <Fragment>
      <title>Home Bar • Cocktails</title>
      {mustHave && (
        <Filter
          well={well}
          searchTerm={searchTerm}
          handleText={handleText}
          mainAlc={mainAlc}
          handleMainAlc={handleMainAlc}
          filter={filter}
          handleChange={handleChange}
        />
      )}
      {totalLoading === null || auxloading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            {() => getUserCocktails()}
          </Spinner>
        </div>
      ) : (
        <Fragment>
          {cocktails.length > 0 && ingredients && (
            <CocktailsIndex
              location={location.pathname}
              user={user}
              cocktails={sorted(cocktails)}
              using={Object.keys(ingredients)}
              mustHave={Object.keys(mustHave)}
              favorites={user.favorites}
              favoritesPage={false}
            />
          )}
        </Fragment>
      )}
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
  cocktails: state.cocktails,
  well: state.ingredients.well
});

export default connect(mapStateToProps, {
  logout,
  getUserCocktails,
  fetchUserLists,
  addMustHave,
  clearCocktails,
  removeMustHave,
})(Main);