import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
class Item extends Component {
  constructor(props) {
    super(props);
    // this.state = { drink: null, error: null, isLoaded: false };
    // this.ingredientList = this.ingredientList.bind(this)
  }
  _isMustHave(item) {
    return this.props.mustHave.includes(item.toLowerCase().trim())
      ? "#fca103"
      : "#4CA64C";
  }
  renderIngredients(drink) {
    let adjustedProps = this.props.using
    let ingObj = {}
    for (let i = 0; i < drink.using2.length; i++) {
      ingObj[drink.using2[i]] = drink.using[i]
    }

    
    return drink.using2.map((ing) => {
      return (
        <div className="ingredientItem">
          {adjustedProps.includes(ing) ? (
            <Fragment>
              <div
                className="box arrow-right"
                style={{ backgroundColor: `${this._isMustHave(ing)}` }}
              ></div>

              <div
                className="ingredientName"
                style={{ backgroundColor: "grey", color: "white" }}
              >
                {ingObj[ing].toUpperCase()}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="box"></div>
              <div className="ingredientName"> {ingObj[ing].toUpperCase()}</div>
            </Fragment>
          )}
        </div>
      );
    });
  }

  render() {
    if (!this.props.drink) {
      return null;
    }
    let { drink, using } = this.props;
    return (
      <Link to={`/cocktails/${drink._id}`}>
      <div className="drinkCard">
        <div>
          {/* <p>{drink.strCategory}</p> */}
          <img
            src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
            style={{ width: "100%", marginBottom: "10px" }}
            alt=""
          />
          <p
            className="drinkTitle"
            style={{ width: "100%", textAlign: "center" }}
          >
            {drink.name}
          </p>
        </div>
        {this.renderIngredients(drink)}
      </div>
      </Link>
    );
  }
}




export const DrinkCard = styled.div`
  width: 260px;
  height: 530px;
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: white;
  .drinkTitle {
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 1.233333rem;
    font-weight: 500;
    padding: 0, 10px, 0, 10px;
  }
`;
export default Item;