import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, removeFavorite, formCocktailUrl, clearCocktails, clearCocktail } from '../../actions/cocktail_actions'
import { Card, Popover, OverlayTrigger, ListGroup, ListGroupItem, Badge, Collapse } from "react-bootstrap";
import Tequila from "../major/Tequila";
import Vodka from "../major/Vodka";
import Gin from "../major/Gin";
import TripleSec from "../major/TripleSec";
import uuid from "react-uuid";
import history from "../../history";
import random from 'random';
import AnimateItem from "./AnimateItem";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
const Item = ({ user, mustHave,ind, using, drink, clearCocktails}) => {
  const [open, setOpen] = useState(random.int(1, 3) === 3 ? true : false);

  const [on, toggle] = useState(true);
  const transitions = useTransition(on, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const doesHave = (ingId) => {
    return using.includes(ingId) ? 
    "success" :
    "dark"
  }
  const renderList = () => {
    return <ListGroup>
      {drink.using2.map((el, i) => {
        return (
          <ListGroupItem
            key={uuid()}
            style={{ textTransform: "capitalize" }}
            variant={doesHave(el)}
          >
            {drink.measurements[i]
              ? `${drink.measurements[i]} ${drink.ingredients[i]}`
              : `${drink.ingredients[i]}`}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  }
  
  const checkedNum = () => {
    let count  = 0
    drink.using2.forEach(el => {
      if(using.includes(el)) count++
    })
    return count
  }

  const inShelf = (id) => {
    return user.ingredients.includes(id) ? "#4CA64C" : "darkgray";
  };


  const handleLink = e => {
    const id = e.target.id
    clearCocktails()
    setTimeout(() => {
      history.push(`/cocktails/${id}`)
    }, 100);
  }
  if (!drink) {
    return null;
  }
  return (
          <div
            className="cardSm"
            style={{
              backgroundColor: "white",
              width: `18rem`,
              height: `${drink.name.length > 25 ? 28 : random.int(26, 30)}rem`,
              // height: "26rem",
              height: "none",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => setOpen(!open)}
          >
            <Card.Img
              id={drink._id}
              // onClick={(e) => handleLink(e)}
              style={{cursor:"pointer"}}
              variant="top"
              src={formCocktailUrl(drink)}
            />
            <Card.Body style={{ justifyContent: "center", padding: "1.25rem 0 1.25rem 0", borderRadius: 0 }}>
            <Link to={`/cocktails/${drink._id}`}>
              <Card.Title
                className="text-center"
                style={{ overflow: "hidden" }}
                >
                {drink.name}
                {/* {drink.name.slice(0, 25)}
                    {drink.name.length > 25 && "..."} */}
              </Card.Title>
            </Link>
              <Collapse in={open}>{renderList()}</Collapse>

              <div className="text-center" style={{ height: "30px" }}>
                {drink.using2.includes("5e9d51a19a6bb767c4002b9e") && (
                  <Vodka dimension="30px" used={true} />
                )}
                {drink.using2.includes("5e9d51a19a6bb767c4002b9f") && (
                  <Gin dimension="30px" used={true} />
                )}
                {drink.using2.includes("5e9d51a29a6bb767c4002d24") && (
                  <TripleSec dimension="30px" used={true} />
                )}
                {drink.using2.includes("5e9d51a19a6bb767c4002ba1") && (
                  <Tequila dimension="30px" used={true} />
                )}
              </div>
              <Card.Text className="text-center">
                {checkedNum()} out of {drink.using2.length} ingredients
              </Card.Text>
            </Card.Body>

            {/* <ListGroup className="list-group-flush">
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup> */}
          </div>
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


export default connect(null, {addFavorite, removeFavorite, clearCocktails})(Item);