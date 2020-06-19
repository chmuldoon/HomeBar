import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { Card, Image, Modal, Row, Col } from "react-bootstrap";
import { removeMustHave, addMustHave } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';

const UsingItem = ({item, removeMustHave, addMustHave, mustHave}) => {
  const status = mustHave.includes(item._id)
  const [isFlipped, setIsFlipped] = useState(false);
  debugger
  const handleClick = e => {
    e.preventDefault();
    setIsFlipped(!isFlipped)
  }
  const handleMustHave = id  => {
    mustHave.includes(id) ? removeMustHave(id) : addMustHave(id);

  }
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

        <Card style={{ height: "12rem", width: "12rem" }}>
          <Card.Body>
            <Card.Title
              style={{ textTransform: "capitalize" }}
              onClick={handleClick}
            >
              {item.name}
            </Card.Title>
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
}


export default connect(null, {addMustHave, removeMustHave})(UsingItem)
