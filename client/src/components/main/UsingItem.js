import React from 'react'
import {
  removeIngredient,
  removeMustHave,
  addMustHave,
} from "../../actions/ingredient_actions";
import { connect } from "react-redux";
import styled from 'styled-components';

const UsingItem = ({color, photo, name, ingId, cocktailsNum,using, mustHave, removeIngredient, isMustHave, removeMustHave, addMustHave}) => {
  const handleMustHave = id => {
    
  }
  debugger
  return (
    // <div
    //   className="ingItem"
    //   style={{
    //     backgroundColor: color,
    //     color: "white",
    //     minWidth: "50px",
    //   }}
    // >
       <IngCard color={color}>

        <img src={photo}></img>
        {name}
        {`Used in ${cocktailsNum} drinks`}
      </IngCard>
      /* {isMustHave ? (
        <p onClick={() => removeMustHave(ingId)}>
          {name}
        </p>
      ) : (
        <p onClick={() => addMustHave(ingId)}>{name}</p>
      )}
      <i
        onClick={() => removeIngredient(ingId)}
        class="fas fa-times"
        style={{ color: "white", marginLeft: "5px", marginTop: "1px" }}
      ></i> */
    // </div>
  );
};

export const IngCard = styled.div`
  height: 20%;
  width: 20%;
  margin: 0 auto 0 auto;
  background-color: ${props => props.color};

  > img {
    height: 50%
  }
`

export default connect(null, { removeIngredient, removeMustHave, addMustHave })(
  UsingItem
);

