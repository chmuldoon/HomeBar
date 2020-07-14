import React from 'react'
import Item from "./Item";
import AnimateItem from './AnimateItem';
const CocktailsIndex = ({history, mustHave, using, favorites, cocktails, favoritesPage}) => {

  return (
    <div className="drinkSection">
      {cocktails.map((drink) => {
        const myComponent = (
          <Item
            mustHave={mustHave}
            favorites={favorites}
            using={using}
            // key={drink.name}
            favoritesPage={favoritesPage}
            drink={drink}
            // wait={2000}
          />
        );
        return <AnimateItem component={myComponent} key={drink.name}/>

      
      })}
    </div>
  );
}

export default CocktailsIndex
