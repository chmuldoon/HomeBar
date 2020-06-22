import React from 'react'
import Item from "./Item";

const CocktailsIndex = ({mustHave, using, favorites, cocktails, favoritesPage}) => {
  return (
    <div className="drinkSection">
        {cocktails.map((drink) => (
            <Item
              mustHave={mustHave}
              favorites={favorites}
              using={using}
              key={drink.name}
              favoritesPage={favoritesPage}
              drink={drink}
            />
        ))}
      </div>

  );
}

export default CocktailsIndex
