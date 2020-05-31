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
    !using ? <div>loading</div> : <div className="usingContent">
      {using.map((used) => (
        <UsingItem
          color={isMustHave(used._id)}
          name={used.name}
          photo={used.img}
          ingId={used._id}
          isMustHave={isMustHave(used._id) == "#fca103"}
          key={used._id}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  using: Object.values(state.ingredients.ingredients),
  mustHave: Object.values(state.ingredients.mustHave)
});
export default connect(mapStateToProps, { removeIngredient, removeMustHave, addMustHave })(
  UsingArea
);

