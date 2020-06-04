import React from 'react'
import Item from "./Item";

const CocktailsIndex = ({mustHave, using, favorites, cocktails}) => {
  return (
    <div className="drinkSection">
      {cocktails.map((drink) => (
        <div>
          <Item
            mustHave={mustHave}
            favorites={favorites}
            using={using}
            key={drink.name}
            drink={drink}
          />
        </div>
      ))}
      ))}
    </div>
  );
}

export default CocktailsIndex
