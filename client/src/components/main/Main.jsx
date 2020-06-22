
import React, { useEffect, Fragment, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth_actions"
import { getUserCocktails } from "../../actions/cocktail_actions";
import CocktailsIndex from "./CocktailsIndex";
import Navbar from "./Navbar";
import UsingArea from "./UsingArea";
import { fetchUserLists } from "../../actions/ingredient_actions";
import { Link } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";
import Tequila from "../major/Tequila";
import Vodka from "../major/Vodka";
import TripleSec from "../major/TripleSec";
import Gin from "../major/Gin";
const Main = ({
  auth: { user },cocktails, logout, getUserCocktails, fetchUserLists, ingredients, mustHave
}) => {
  const [filter, setFilter] = useState({
    tequila: false,
    vodka: false,
    gin: false,
    whiskey: false,
    rum: false,
    tripleSec: false,
    idList: [],
    range: null
  })
  useEffect(() => {

    fetchUserLists()
    getUserCocktails()

  }, [getUserCocktails, fetchUserLists])



  const handleClick = (e) => {
    const info = e.currentTarget.textContent.split(",")
    let kind = info[0]
    let id = info[1]
    debugger
    if(filter[kind]){
      let newIdlist = filter.idList
      newIdlist = newIdlist
        .slice(0, newIdlist.indexOf(id))
        .concat(newIdlist.slice(newIdlist.indexOf(id) + 1));
      setFilter({...filter, [kind]: false, idList: newIdlist })
    }else{
      const newIdlist = filter.idList.concat(id);

      setFilter({ ...filter, [kind]: true, idList: newIdlist });

    }
  }
  const sorted = (drinks) => {
    let ings = Object.keys(ingredients)
    return drinks.sort((a,b)  => _rank(ings, a.using2) - _rank(ings, b.using2))
  }
  const _rank = (list, using) => {
    let count = 0;
    using.forEach((i) => { if (list.includes(i)) { count++ }; });
    return  using.length - count
  };

  const filterCard = (
    <Card>
      <Card.Body>Filter by popular Alcohol</Card.Body>
      <Card.Body>
        <div style={{textTransform: "capitalize"}} onClick={(e) => handleClick(e)}>
          <Vodka used={filter.vodka} dimension="30px" />
          vodka
        </div>
        <div style={{textTransform: "capitalize"}} onClick={(e) => handleClick(e)}>
          <Tequila used={filter.tequila} dimension="30px" />
          tequila
        </div>
        <div style={{textTransform: "capitalize"}} onClick={(e) => handleClick(e)}>
          <Gin used={filter.gin} dimension="30px" />
          gin
        </div>
        <div style={{textTransform: "capitalize"}} onClick={(e) => handleClick(e)}>
          <TripleSec used={filter.tripleSec} dimension="30px" />
          tripleSec
        </div>
      </Card.Body>
    </Card>
  );
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
      {filterCard}
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