import React, { useEffect, Fragment, useState } from "react";
import { fetchSearchItems } from "../../actions/search_actions";
import { connect } from "react-redux";
import { addIngredient } from "../../actions/ingredient_actions";
import Shelf from "./Shelf";
import { logout } from "../../actions/auth_actions";
import { Link } from "react-router-dom";
const Navbar = ({auth:{ user},fetchSearchItems, logout, addIngredient, ingredients, cocktails}) => {
  const [searchType, setSearchType] = useState("ingredients");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayed, setDisplayed] = useState([]);
  useEffect(() => {
    fetchSearchItems()
  }, [fetchSearchItems])
  const handleChange = field => {
    return e => {

      let filtered = searchType === "ingredients" ? ingredients : cocktails 
   
      if (e.target.value === "") {
        filtered = [];
      }else{
        filtered = filtered.filter((ing) =>
          ing.name
            .split(" ")
            .some((part) =>
              part.toLowerCase().startsWith(e.target.value.toLowerCase())
            )
        );
      }
      setSearchTerm(e.target.value);
      setDisplayed(filtered);
    }
  }

  return user === null ? (
    <></>
  ) : (
    <div className="topBar">
      <div className="barLeft">
        {ingredients !== null && (
          <div>
            <input
              className="searchInput"
              type="text"
              placeholder={`Search for Ingredients`}
              value={searchTerm}
              onChange={handleChange("searchTerm")}
            />
            <div className="searchType">
              {searchType === "drinks" ? (
                <div
                  className="searchTypeLeft"
                  style={{
                    backgroundColor: "#4CA64C",
                  }}
                >
                  Drinks
                </div>
              ) : (
                <div
                  className="searchTypeLeft"
                  onClick={() => {
                    setSearchType("drinks");
                    setSearchTerm("");
                    setDisplayed([]);
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "1px #4CA64C",
                  }}
                >
                  Drinks
                </div>
              )}
              {searchType === "ingredients" ? (
                <div
                  className="searchTypeRight"
                  style={{
                    backgroundColor: "#4CA64C",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Ingredients
                </div>
              ) : (
                <div
                  className="searchTypeRight"
                  onClick={() => {
                    setSearchType("ingredients");
                    setSearchTerm("");
                    setDisplayed([]);
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",

                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Ingredients
                </div>
              )}
            </div>
          </div>
        )}
        <div className="sideBar">
          {searchType === "drinks" &&
            displayed.map((drink) => {
              return (
                <Fragment>
                  <Link to={`/cocktails/${drink._id}`}>
                    <div className="searchItem">
                      <img
                        src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
                      />
                      <p>{drink.name}</p>
                    </div>
                  </Link>
                </Fragment>
              );
            })}
          {searchType === "ingredients" &&
            displayed.map((ing) => {
              return (
                <Fragment>
                  <div
                    className="searchItem"
                    onClick={() => addIngredient(ing._id)}
                  >
                    <img src={ing.img} />
                    <p>
                      {ing.name.length > 22 ? ing.name.slice(0, 10) : ing.name}
                      {ing.cocktails.length}
                    </p>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
      <Link to="/shelf">
        <Shelf style={{ hover: "cursor" }} />
      </Link>
      <Link to="/favorites">
        <i class="fas fa-star"></i>
      </Link>

      <Link to="/main">
        <i class="fas fa-cocktail"></i>
      </Link>

      <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt" />
      </a>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,

    ingredients: state.search.ingredients,
    cocktails: state.search.cocktails,
  };
} ;

export default connect(mapStateToProps, { fetchSearchItems,logout, addIngredient })(Navbar)
