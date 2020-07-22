import React, { useEffect, Fragment, useState } from 'react'
import { removeIngredient, removeMustHave, addMustHave, fetchUserLists, addIngredient } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';
import styled from "styled-components";
import { fetchSearchItems } from '../../actions/search_actions';
import { Card, Image, Modal, Button } from 'react-bootstrap';
import UsingItem from './UsingItem';
import Select from "react-select";
import AnimateItem from './AnimateItem';

const UsingArea = ({
  using,
  mustHave,
  removeIngredient,
  removeMustHave,
  addMustHave,
  addIngredient,
  fetchUserLists,
  fetchSearchItems,
  search
}) => {
  const [displayModal, toggleModal] = useState(false);
  const [selectedIng, setSelectedIng] = useState({
     label: "Select an Ingredient", value: null
  })

  useEffect(() => {
    fetchUserLists()
    fetchSearchItems()
  }, [])

  const _capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  const convertIngredientsToOptions = (ings) => {
    return ings.map((ing) => {
      return ({ ...ing, value: `${ing._id}`, label: `${_capitalize(ing.name)}` });
    });
  };
  const condenseList = (ings) => {
    const list = convertIngredientsToOptions(ings)
    const newList = list.filter(el => !Object.keys(using).includes(el._id) )
    newList.unshift({label: "Select an Ingredient", value: null})
    return newList
  }
  const handleIngredient = e => {
    setSelectedIng({label: e.label, value: e.value})
  }

  const handleClick = id => {
    addIngredient(id);
    setSelectedIng({ label: "Select an Ingredient", value: null});
  }
 
  const renderIngredients = () => {
    return Object.values(using).map((used) => {
      const myComponent = <UsingItem mustHave={Object.keys(mustHave)} item={used} />
      return <AnimateItem key={used._id} component={myComponent} nondefault={true}/>
    });
  }
  return using === null ? (
    <div>loading</div>
  ) : (
    <div>
      <title>Home Bar • Shelf</title>

      <div
        style={{
          width: "70vw",
          margin: "0 auto 2vh auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "90%" }}>
          {search && (
            <Select
              options={condenseList(search)}
              value={selectedIng}
              placeholder="cool"
              onChange={(e) => handleIngredient(e)}
            />
          )}
        </div>
        {selectedIng.label && selectedIng.value ? (
          <Button
            variant="primary"
            onClick={() => handleClick(selectedIng.value)}
          >
            Add
          </Button>
        ) : (
          <Button variant="secondary">Add</Button>
        )}
      </div>
      <div style={{ width: "70vw" }} className="drinkSection">
        {renderIngredients()}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  using: state.ingredients.ingredients,
  mustHave: state.ingredients.mustHave,
  search: state.search.ingredients
});


export const IngCard = styled.div`
  height: 20%;
  width: 20%;
  margin: 0 auto 0 auto;
  background-color: ${(props) => props.color};

  > img {
    height: 50%;
  }
`;

export const InputIng = styled.div`
  width: 500px;
  height: 500px;
  background-color: purple;

`
export default connect(mapStateToProps, {fetchUserLists, addIngredient, fetchSearchItems, removeIngredient, removeMustHave, addMustHave })(
  UsingArea
);

