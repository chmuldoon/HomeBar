import React from 'react'
import {
  removeIngredient,
  removeMustHave,
  addMustHave,
} from "../../actions/ingredient_actions";
import { connect } from "react-redux";

const UsingItem = ({color, name, ingId, removeIngredient, isMustHave, removeMustHave, addMustHave}) => {
  return (
    <div
      className="ingItem"
      style={{
        backgroundColor: color,
        color: "white",
        minWidth: "50px",
      }}
    >
      {isMustHave ? (
        <p onClick={() => removeMustHave(ingId)}>
          {name}
          {"o"}
        </p>
      ) : (
        <p onClick={() => addMustHave(ingId)}>{name}</p>
      )}
      <i
        onClick={() => removeIngredient(ingId)}
        class="fas fa-times"
        style={{ color: "white", marginLeft: "5px", marginTop: "1px" }}
      ></i>
    </div>
  );
};

export default connect(null, { removeIngredient, removeMustHave, addMustHave })(
  UsingItem
);

