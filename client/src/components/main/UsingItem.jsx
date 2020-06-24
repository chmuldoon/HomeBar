import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { Card, Image, Modal, Row, Col, Button } from "react-bootstrap";
import { removeMustHave, addMustHave, removeIngredient } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';
const UsingItem = ({
  item,
  removeMustHave,
  addMustHave,
  mustHave,
  removeIngredient,
}) => {
  const status = mustHave.includes(item._id);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };
  const handleMustHave = (id) => {
    mustHave.includes(id) ? removeMustHave(id) : addMustHave(id);
  };
  const isMustHave = (id) => {
    return mustHave.includes(id) ? "#fca103" : "white";
  };

  return (
    <div style={{ height: "12rem", width: "12rem", margin: "0 10px 0 10px" }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card
          style={{
            backgroundColor: `${isMustHave(item._id)}`,
            height: "12rem",
            width: "12rem",
            textTransform: "capitalize",
            border: "none",
          }}
          onClick={handleClick}
        >
          <Card.Img
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              height: "10rem",
              width: "10rem",
            }}
            src={item.img}
          />
          <Card.Title
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {item.name}
          </Card.Title>
        </Card>

        <Card onDoubleClick={handleClick} style={{ height: "12rem", width: "12rem", border: "none" }}>
          <Card.Body>
            <Card.Title
              style={{ textTransform: "capitalize" }}
              // onClick={handleClick}
            >
              {item.name}
            </Card.Title>
            <Button onClick={() => removeIngredient(item._id)}> X </Button>
            <Card.Text>Used in {item.cocktails.length} cocktails</Card.Text>
            <Row>
              <Col>
                <Card.Text>Must have?</Card.Text>
              </Col>
              <Col>
                <label style={{ cursor: "pointer" }} className="switch">
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    checked={status}
                    onChange={() => handleMustHave(item._id)}
                  />
                  <span class="slider round"></span>
                </label>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </ReactCardFlip>
    </div>
  );
};


export default connect(null, { addMustHave, removeMustHave, removeIngredient })(
  UsingItem
);
