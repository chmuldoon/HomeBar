import React, { Fragment, useEffect } from 'react'
import { getCocktail, addFavorite, removeFavorite, similarCocktails, resetCocktails } from '../../actions/cocktail_actions';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Image, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardBody } from 'react-bootstrap/Card';

const CocktailPage = ({match, similar,resetCocktails, drink, getCocktail, addFavorite, removeFavorite,similarCocktails, loading, auth:{user}}) => {
  useEffect(() => {
    // drink = null

    getCocktail(match.params.id);
  
    similarCocktails(match.params.id)
  },[getCocktail, similarCocktails, match])
  const renderIngredients = () => {
    return drink.using.map((el, i) => {
      return (
        <ListGroupItem style={{height: "2.5rem", border: "none"}}>
          <Badge style={{ backgroundColor: inShelf(drink.using2[i]), color: inShelf(drink.using2[i]) }}>
            {" X "}
          </Badge>

          {"    "}
          {drink.measurements[i]
            ? `${drink.measurements[i]} of ${drink.ingredients[i]}`
            : `${drink.ingredients[i]}`}
        </ListGroupItem>
      );
    })
  }
  const inShelf = (id) => {
    debugger
    return user.ingredients.includes(id) ? "#4CA64C" : "darkgray";
  }
  const renderSimilar = () => {
    return similar.map(el => {
      return (
        <Card style={{width: "8rem"}}>
          <Link to={`/cocktails/${el._id}`}>
            <Card.Title>{el.name}
            
            </Card.Title>
            <Card.Img
              src={`https://www.thecocktaildb.com/images/media/drink/${el.photo}`}
              rounded
            />
          </Link>
        </Card>
      );
    })
  }
  return loading ? (
    <p>loading</p>
  ) : (
    drink && user && similar && (
      <Fragment>
        <Card style={{ width: "20rem", border: "none" }}>
          <Card.Img
            src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
          />
          <Card.Header>
            {drink.name}
            {user.favorites.includes(drink._id) ? (
              <i
                className="fas fa-star"
                onClick={() => removeFavorite(drink._id, false)}
                style={{ color: "yellow" }}
              />
            ) : (
              <i
                className="far fa-star"
                onClick={() => addFavorite(drink._id)}
                style={{ color: "black" }}
              />
            )}
          </Card.Header>
          <ListGroup>{renderIngredients()}</ListGroup>
          <Card.Body>
            {drink.glass && <Card.Text>Served in a {drink.glass}</Card.Text>}
            <Card.Text>{drink.instructions}</Card.Text>
          </Card.Body>
          {/* <h1>
            {drink.name}
            {user.favorites.includes(drink._id) ? (
              <i
                className="fas fa-star"
                onClick={() => removeFavorite(drink._id, false)}
                style={{ color: "yellow", cursor: "pointer" }}
              />
            ) : (
              <i
                className="far fa-star"
                onClick={() => addFavorite(drink._id)}
                style={{ color: "black", cursor: "pointer" }}
              />
            )}
          </h1>
          <Card.Body>
            <Card.Title>Ingredients</Card.Title>

            <ListGroup>{renderIngredients()}</ListGroup>
            <br></br>
            <Card.Title>Instructions</Card.Title>
            <Card.Text>{drink.instructions}</Card.Text>
          </Card.Body> */}
        </Card>
        <div style={{ display: "flex" }}>{renderSimilar()}</div>
        {/* <Row className="justify-content-md-center">
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {drink.name}
                  {user.favorites.includes(drink._id) ? (
                    <i
                      className="fas fa-star"
                      onClick={() => removeFavorite(drink._id, false)}
                      style={{ color: "yellow" }}
                    />
                  ) : (
                    <i
                      className="far fa-star"
                      onClick={() => addFavorite(drink._id)}
                      style={{ color: "black" }}
                    />
                  )}
                </Card.Title>
              </Card.Body>
              <Card.Img
                src={`https://www.thecocktaildb.com/images/media/drink/${drink.photo}`}
                rounded
              />
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Ingredients</Card.Title>

                <ListGroup>{renderIngredients()}</ListGroup>
                <br></br>
                <Card.Title>Instructions</Card.Title>
                <Card.Text>{drink.instructions}</Card.Text>
              </Card.Body>
            </Card>
            <Button onClick={() => similarCocktails(drink._id)}> hey</Button>
            <div style={{display: "flex"}}>
              {renderSimilar()}
            </div>
          </Col>
        </Row> */}
      </Fragment>
    )
  );

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    drink: state.cocktails.cocktail,
    similar: state.cocktails.cocktails,
    loading: state.cocktails.loading
  }
} ;

export default connect(mapStateToProps, {getCocktail,resetCocktails,  addFavorite,similarCocktails, removeFavorite})(CocktailPage)
