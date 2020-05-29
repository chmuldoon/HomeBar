import React from 'react'
import { removeIngredient, removeMustHave, addMustHave } from '../../actions/ingredient_actions';
import { connect } from 'react-redux';
import UsingItem from './UsingItem';

const UsingArea = ({
  using,
  mustHave,
  removeIngredient,
  removeMustHave,
  addMustHave,
}) => {
  const isMustHave = (id) => {

    let ids = mustHave.map(m => m._id)
    return ids.includes(id) ? "#fca103" : "#4CA64C";
  };

  return (
    <div className="usingContent">
      <div style={{ width: "100%" }}>
        {using.length === 0 ? (
          <p>
            Your virtual shelf is empty. Please search and add some ingredients.
          </p>
        ) : (
          <p>Your virtual shelf is stocked with:</p>
        )}
      </div>
      {using.map((used) => (
        <UsingItem
          color={isMustHave(used._id)}
          name={used.name}
          ingId={used._id}
          isMustHave={isMustHave(used._id) == "#fca103"}
          key={used._id}
        />
      ))}
    </div>
  );
};

export default connect(null, { removeIngredient, removeMustHave, addMustHave })(
  UsingArea
);

