import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { Card, Image, Modal } from "react-bootstrap";
import { removeMustHave, addMustHave } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';

const UsingItem = ({item, removeMustHave, addMustHave, mustHave}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = e => {
    e.preventDefault();
    setIsFlipped(!isFlipped)
  }
  const handleMustHave = id  => {
    mustHave.includes(id) ? removeMustHave(id) : addMustHave(id);

  }
  const isMustHave = (id) => {
    
    return mustHave.includes(id) ? "#fca103" : "#4CA64C";
  };

  return (
    <div style={{ height: "12rem", width: "12rem" }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card style={{ height: "12rem", width: "12rem" }} onClick={handleClick}>
          <Card.Img src={item.img} />
        </Card>

        <Card style={{ height: "12rem", width: "12rem" }}>
          <Card.Body>
            <Card.Title onClick={handleClick}>{item.name}</Card.Title>
            <Card.Text>Used in {item.cocktails.length} cocktails</Card.Text>
            <Card.Text>Must have ingredient?</Card.Text>

            <label class="switch">
              <input
                type="checkbox"
                checked={mustHave.includes(item._id)}
                onChange={() => handleMustHave(item._id)}
              />
              <span class="slider round"></span>
            </label>
          </Card.Body>
        </Card>
      </ReactCardFlip>
    </div>
  );
}


export default connect(null, {addMustHave, removeMustHave})(UsingItem)
