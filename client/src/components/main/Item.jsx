import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from '../../actions/cocktail_actions'
import { Card } from "react-bootstrap";


const Item = ({ mustHave, favorites,favoritesPage, using, drink, addFavorite, removeFavorite}) => {
  const _isMustHave = (item) => {
    return mustHave.includes(item.toLowerCase().trim())
      ? "#fca103"
      : "#4CA64C";
  }
  const renderIngredients = (drink) => {
    let adjustedProps = using
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
                style={{ backgroundColor: `${_isMustHave(ing)}` }}
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
  if (!drink) {
    return null;
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
      />
      <Card.Body>
        <Card.Title>{drink.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup> */}
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    // <div className="drinkCard">

    //   <div>
    //     {/* <p>{drink.strCategory}</p> */}
    //     <img
    //       src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
    //       style={{ width: "100%", marginBottom: "10px" }}
    //       alt=""
    //     />

    //     <Link to={`/cocktails/${drink._id}`}>
    //       <p
    //         className="drinkTitle"
    //         style={{ width: "100%", textAlign: "center" }}
    //       >
    //         {drink.name}
    //       </p>
    //     </Link>
    //   </div>
    //   {renderIngredients(drink)}
    // </div>
  );
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


export default connect(null, {addFavorite, removeFavorite})(Item);