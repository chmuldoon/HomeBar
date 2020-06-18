import React, { useEffect, Fragment, useState } from 'react'
import { removeIngredient, removeMustHave, addMustHave, fetchUserLists, addIngredient } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';
import styled from "styled-components";
import { fetchSearchItems } from '../../actions/search_actions';
import { Card, Image, Modal } from 'react-bootstrap';
import UsingItem from './UsingItem';
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
  const [searchTerm, setSearchTerm] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetchUserLists()
    fetchSearchItems()
  }, [fetchUserLists, fetchSearchItems])

  const handleChange = (field) => {
    return (e) => {
      let filtered = search
      if (e.target.value === "") {
        filtered = [];
      } else {
        filtered = filtered.filter((ing) =>
          ing.name
            .split(" ")
            .some((part) =>
              part.toLowerCase().startsWith(e.target.value.toLowerCase())
            )
        );
      }
      setSearchTerm(e.target.value);
      setDisplayed(filtered);
    };
  };
  const handleClose = (id) => removeIngredient(id)
  const isMustHave = (id) => {

    let ids = Object.values(mustHave).map(m => m._id)
    return ids.includes(id) ? "#fca103" : "#4CA64C";
  };
  const updateMustHave = (id) => {
  
    Object.keys(mustHave).includes(id) ? removeMustHave(id) : addMustHave(id);

  }

 
  const renderIngredients = () => {
    return Object.values(using).map((used) => (
      <UsingItem key={used._id} mustHave={Object.keys(mustHave)} item={used} />
      // <div className="flip-card">
      //   <div className="flip-card-inner">
      //     <div className="flip-card-front">
      //       <img
      //         src={used.img}
      //         alt="Avatar"
      //         style={{ width: "300px", height: "300px" }}
      //       />
      //     </div>
      //     <div className="flip-card-back">
      //       <h1>{used.name}</h1>
      //       <p>{`Used in ${used.cocktails.length} drinks`}</p>
      //       <p>See More</p>
      //     </div>
      //   </div>
      // </div>
      // <Modal.Dialog onHide={handleClose(used._id)}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>{used.name}</Modal.Title>
      //     {/* <Modal.Img variant="top" src={used.img}></Modal.Img> */}
      //   </Modal.Header>
      // </Modal.Dialog>

      // <Card style={{ width: "9rem", height: "18rem" }}>
      //   <Card.Img variant="top" src={used.img}></Card.Img>
      //   <Card.Body>
      //     <Card.Title>{used.name}</Card.Title>
      //     <Card.Text>{`Used in ${used.cocktails.length} drinks`}</Card.Text>
      //   </Card.Body>
      // </Card>
      // <IngCard
      //   color={isMustHave(used._id)}
      //   onClick={() => updateMustHave(used._id)}
      // >
      //   <img src={used.img}></img>
      //   {used.name}
      //   {`Used in ${used.cocktails.length} drinks`}
      //   <i className="fas fa-times-circle"
      //     onClick={() => removeIngredient(used._id)}
      //   />
      // </IngCard>
    ));
  }

  return using === null ? (
    <div>loading</div>
  ) : (
    <Fragment>
      {renderIngredients()}
      <IngCard color="darkgrey" onClick={() => toggleModal(!displayModal)}>
          <i className="fas fa-plus" />
        </IngCard>

      {displayModal && (
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
              </InputIng>
            </div>
          </div>
        </div>
      )}
    </Fragment>
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

