import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formCocktailUrl } from '../../actions/cocktail_actions';
const Similar = (props) => {
  const { similar} = props;
  const renderSimilar = () => {
    return similar.map((el) => {
      return (
        <Card style={{ width: "8rem" }}>
          <Link to={`/cocktails/${el._id}`}>
            <Card.Title>{el.name}</Card.Title>
            <Card.Img src={formCocktailUrl(el)} rounded />
          </Link>
        </Card>
      );
    });
  };
  return (
    <div>
      
    </div>
  )
}

export default Similar
