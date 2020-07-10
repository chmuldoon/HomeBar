import React, { Fragment, useEffect } from "react";
import { connect } from 'react-redux'
import { useState } from 'react'
import { withTheme } from 'styled-components'
import { Image } from 'react-bootstrap'
import { fetchSearchItems } from '../../actions/search_actions'
const CreateCocktail = ({ fetchSearchItems, search, loading }) => {
  const [cocktailFormData, setCocktailFormData] = useState({
    name: "",
    instrutions: "",
    glass: "",
    using2: [""],
    using: [""],
    measurements: [""],
    photo: "",
  });
  useEffect(() => {
    fetchSearchItems();
  }, [fetchSearchItems]);
  const {
    name,
    instructions,
    glass,
    using2,
    using,
    measurements,
    photo,
  } = cocktailFormData;
  const onChange = (e) => {
    return setCocktailFormData({
      ...cocktailFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleMeasurements = (e) => {
    const newMeasurements = measurements.slice();
    newMeasurements[e.target.name] = e.target.value;
    debugger
    setCocktailFormData({...cocktailFormData, measurements: newMeasurements});
  }
  const onSubmit = async (e) => {};
  const ingredientBar = () => {
    return using2.map((el, i) => {
        return (
          <div style={{ display: "flex" }}>
            measurement{" "}
            <input
              type="text"
              placeholder="Cocktail Name"
              name={i}
              value={measurements[i]}
              onChange={(e) => handleMeasurements(e)}
              required
            />
          </div>
        );
      })
  }
  const addIng = () => {
    let newUsing = using2.slice();
    newUsing.push("")
    setCocktailFormData({...cocktailFormData, using2: newUsing})
  }
  return (
    loading ? <div>loading...</div> : <div
      style={{
        backgroundColor: "white",
        width: "50vw",
        minHeight: "50vh",
        maxHeight: "80vh",
      }}
    >
      {photo.length ? (
        <Image style={{ width: "10vw" }} rounded src={photo} />
      ) : (
        <Fragment></Fragment>
      )}
      <form>
        {cocktailFormData.name}
        <div className="form-group">
          Name
          <input
            type="text"
            placeholder="Cocktail Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          Photo
          <input
            type="text"
            placeholder="Photo Url"
            name="photo"
            value={photo}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          Instructions
          <textarea
            type="textarea"
            placeholder="How do you make this cocktail?"
            name="instructions"
            value={instructions}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        {ingredientBar()}
        <button onClick={() => addIng()}>More</button>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  search: state.search.ingredients,
  loading: state.search.loading

})

export default connect(mapStateToProps, { fetchSearchItems })(CreateCocktail);
