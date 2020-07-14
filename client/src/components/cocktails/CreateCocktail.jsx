import React, { Fragment, useEffect } from "react";
import { connect } from 'react-redux'
import { useState } from 'react'
import { withTheme } from 'styled-components'
import { Image } from 'react-bootstrap'
import { fetchSearchItems } from '../../actions/search_actions'
import Select from "react-select";
import { clearCocktail, createCocktail } from "../../actions/cocktail_actions";
import { Redirect } from "react-router-dom";
const CreateCocktail = ({ fetchSearchItems, createCocktail, search, cocktail, history, loading }) => {
  const [cocktailFormData, setCocktailFormData] = useState({
    name: "",
    instructions: "",
    glass: "",
    using2: [""],
    using: [""],
    measurements: [""],
    photo: "",
    userMade: true
  });

  const glasses = [
    "Shot glass",
    "Collins Glass",
    "Cocktail glass",
    "Wine Glass",
    "Martini Glass",
    "Highball Glass",
    "Beer mug",
    "Highball glass",
    "Coffee Mug",
    "Whiskey sour glass",
    "Pint glass",
    "Beer pilsner",
    "Champagne flute",
    "Old-Fashioned glass",
    "Hurricane glass",
    "Collins glass",
    "Old-fashioned glass",
    "Champagne Flute",
    "Nick and Nora Glass",
    "White wine glass",
    "Irish coffee cup",
    "Punch bowl",
    "Margarita glass",
    "Cocktail Glass",
    "Margarita/Coupette glass",
    "Coupe Glass",
    "Pitcher",
    "Cordial glass",
    "Coffee mug",
    "Copper Mug",
    "Shot Glass",
    "Pousse cafe glass",
    "Brandy snifter",
    "Mason jar",
    "Punch Bowl",
    "Beer Glass",
    "Balloon Glass",
    "Parfait glass",
  ];
  const convertGlasses = (arr) => {
    return arr.map(el => {
      return {label: el, name: el}
    })
  }


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
  const handleMeasurements = (e, i) => {
    const newMeasurements = measurements.slice();
    debugger
    newMeasurements[i] = e.target.value;
    setCocktailFormData({...cocktailFormData, measurements: newMeasurements});
  }
  const handleIngredient = (e, i) => {
    debugger
    const newUsing = using.slice();
    const newUsing2 = using2.slice();
    newUsing[i] = e.name;
    newUsing2[i] = e._id;
    setCocktailFormData({
      ...cocktailFormData,
      using: newUsing,
      using2: newUsing2,
    });

  }
  const removeFromArray = (arr, i) => {
    const newArr = arr.slice(0, i).concat(arr.slice(i + 1))
    return newArr
  }
  const handleDelete = (i) => {
    const newMeasurements = removeFromArray(measurements, i)
    const newUsing = removeFromArray(using, i);
    const newUsing2 = removeFromArray(using2, i);
    setCocktailFormData({ ...cocktailFormData, measurements: newMeasurements, using2: newUsing2, using: newUsing });
    
  }
  const handleGlass = (e) => {
    setCocktailFormData({...cocktailFormData, glass: e.name})
    debugger
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    createCocktail(cocktailFormData)
  };
  const ingredientBar = (search) => {
    return using2.map((el, i) => {
        return (
          <div style={{ display: "flex" }}>
            measurement{" "}
            <input
              type="text"
              placeholder="Cocktail Name"
              name={i}
              value={measurements[i]}
              onChange={(e) => handleMeasurements(e, i)}
              required
            />
            <div style={{ width: "200px", textTransform: "capitalize" }}>
              <Select
                name="form-field-name"
                value={{
                  label: using[i],
                  value: using2[i]
                  }}
                options={convertIngredientsToOptions(search)}
                onChange={(e) => handleIngredient(e, i)}
              />
            </div>
            {i > 0 ? <i className="fas fa-times" onClick={() => handleDelete(i)}></i> : <Fragment></Fragment>}
          </div>
        );
      })
  }
  const _capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const convertIngredientsToOptions = (ings) => {
    
    return ings.map((ing) => {
      return { ...ing, value: `${ing._id}`, label: `${_capitalize(ing.name)}` };
    });
   };
  const addIng = () => {

    let newUsing = using2.slice();
    newUsing.push("")
    setCocktailFormData({...cocktailFormData, using2: newUsing})
  }

  return loading ? (
    <div>loading...</div>
  ) : (
    <div
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
      <form onSubmit={(e) => onSubmit(e)}>
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
          Glass
          <Select
            options={convertGlasses(glasses)}
            value={{ value: glass, label: glass }}
            onChange={(e) => handleGlass(e)}
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
        {ingredientBar(search)}
        <button onClick={() => addIng()}>More</button>
        <input type="submit" className="btn btn-primary" value="Create" />
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  search: state.search.ingredients,
  loading: state.search.loading,
  cocktail: state.cocktails.cocktail

})

export default connect(mapStateToProps, { createCocktail, fetchSearchItems })(CreateCocktail);
