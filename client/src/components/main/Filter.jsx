import React from 'react'
import { Card, Form, InputGroup, FormControl } from 'react-bootstrap';
import Slider from 'react-smooth-range-input';
const Filter = ({well, searchTerm, handleText, mainAlc, handleMainAlc, filter, handleChange }) => {
  
  const commonAlcs = () => {
    return ["vodka", "gin", "rum", "triple sec", "tequila"].map(el => {
      return (
        <label className="b-contain" style={{ textTransform: "capitalize", marginRight: "1vh" }}>
          <span>{el}</span>
          <input
            type="checkbox"
            checked={mainAlc.includes(well[el]._id)}
            onClick={() => handleMainAlc(well[el]._id)}
          />
          <div class="b-input"></div>
        </label>
      );
    })
  }
  let count = null
    if(document.querySelector(".drinkSection")){
      count = document.querySelector(".drinkSection").childElementCount
    }

    return (
      <div className="hide-sm">
        <Card
          style={{
            zIndex: "10",
            marginBottom: "2vh",
          }}
        >
          <Card.Body>
            <Card.Title>Filter by popular Alcohol</Card.Title>
            <div style={{ display: "flex" }}>{commonAlcs()}</div>
            <Card.Title>Search By Name</Card.Title>

            <InputGroup className="mb-3">
              <FormControl
                value={searchTerm}
                onChange={(e) => handleText(e)}
                placeholder="Cocktail Name"
                aria-label="Cocktail name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Card.Title>Maximum Ingredients Needed</Card.Title>
            <Slider
              barColor="#004600"
              value={filter}
              min={0}
              max={10}
              onChange={(num) => handleChange(num)}
            />
          </Card.Body>
        </Card>
      </div>
    );
};

export default Filter
