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
    debugger
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
      return <AnimateItem key={used._id} component={myComponent}/>
    });
  }

  return using === null ? (
    <div>loading</div>
  ) : (
    <div>
      <div style={{ width: "60%", margin: "0 auto 2vh auto", display: "flex" }}>
        <div style={{width: "90%"}}>
          {search && <Select
            options={condenseList(search)}
            
            value={selectedIng}
            placeholder="cool"
            onChange={(e) => handleIngredient(e)}
          />}
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
      <div className="drinkSection">
        {renderIngredients()}
      </div>

      {/* {displayModal && (
        <div
          className="modal-background"
          onClick={() => {
            toggleModal(!displayModal);
          }}
        >
          <div
            className="modal-child"
            style={{ display: "flex" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal-case">
              <div className="Xcase">
                <i
                  class="fas fa-times"
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    toggleModal(!displayModal);
                  }}
                ></i>
              </div>
              <InputIng>
                <input
                  className="searchInput"
                  type="text"
                  placeholder={`Search for Ingredients`}
                  value={searchTerm}
                  onChange={handleChange("searchTerm")}
                />
                {displayed.map((ing) => {
                  return (
                    <Fragment>
                      <div
                        className="searchItem"
                        onClick={() => {
                          addIngredient(ing._id);
                          setSearchTerm("");
                          setDisplayed([]);
                          toggleModal(!displayModal);
                        }}
                      >
                        <img src={ing.img} />
                        <p>
                          {ing.name.length > 22
                            ? ing.name.slice(0, 10)
                            : ing.name}
                        </p>
                      </div>
                    </Fragment>
                  );
                })}
              </InputIng> */}
      {/* </div>
          </div>
        </div>
      )} */}
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

