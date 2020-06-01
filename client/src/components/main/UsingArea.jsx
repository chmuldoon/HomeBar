import React, { useEffect, Fragment, useState } from 'react'
import { removeIngredient, removeMustHave, addMustHave, fetchUserLists, addIngredient } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';
import styled from "styled-components";
import { fetchSearchItems } from '../../actions/search_actions';
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
  const isMustHave = (id) => {

    let ids = Object.values(mustHave).map(m => m._id)
    return ids.includes(id) ? "#fca103" : "#4CA64C";
  };
  const updateMustHave = (id) => {
  
    Object.keys(mustHave).includes(id) ? removeMustHave(id) : addMustHave(id);

  }

  const renderIngredients = () => {
    return Object.values(using).map((used) => (
        <IngCard color={isMustHave(used._id)} onClick={() => updateMustHave(used._id)}>
          <img src={used.img}></img>
          {used.name}
          {`Used in ${used.cocktails.length} drinks`}
        </IngCard>
      ))
  }

  return using === null ? (
    <div>loading</div>
  ) : (
    <Fragment>
      <div className="usingContent">
        {renderIngredients()}
        <IngCard color="darkgrey" onClick={() => toggleModal(!displayModal)}>
          <i className="fas fa-plus" />
        </IngCard>
      </div>
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
                          {ing.name.length > 22 ? ing.name.slice(0, 10) : ing.name}
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

