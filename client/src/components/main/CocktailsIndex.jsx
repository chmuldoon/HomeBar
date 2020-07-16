import React from 'react'
import Item from "./Item";
import random from 'random'
import AnimateItem from './AnimateItem';
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
const CocktailsIndex = ({user, history, mustHave, using, favorites, cocktails, favoritesPage}) => {
  // const [listState, setListState] = useState({
  //   items:  cocktails.length ? cocktails.length > 15 ? cocktails.slice(0,15) : cocktails.slice(0) : [],
  //   hasMore: cocktails.length ? cocktails.length > 15 ? true : false : true
  // })

  // const fetchMoreData = () => {
  //   debugger
  //   if(listState.items.length >= cocktails.length){
  //     setListState({ hasMore: false});
  //     return;
  //   }
  //   const firstIdx = listState.items.length ;
  //   const difference = cocktails.length - listState.items.length;
  //   const newChunk = difference > 15 ? cocktails.slice(firstIdx, firstIdx + 15) : cocktails.slice(firstIdx);


  //   setTimeout = () => {
  //     setListState({
  //       items: listState.items.concat(newChunk)
  //     }, 300);
  //   }
  // };
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  debugger
    return (
      cocktails.length > 0 && (

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {cocktails.map((drink, i) => {
              const myComponent = (
                <Item
                  user={user}
                  ind={i}
                  mustHave={mustHave}
                  favorites={favorites}
                  using={using}
                  key={drink.name}
                  favoritesPage={favoritesPage}
                  drink={drink}
                  // wait={2000}
                />
              );
              return (
                <AnimateItem
                  // options={{
                  //   config: { mass: 0.3, friction: 10, tension: 50 },
                  //   from: {
                  //     transform: `translate3d(${
                  //       random.boolean() ? "" : "-"
                  //     }1000px,0,0)`,
                  //   },
                  //   enter: { transform: "translate3d(0,0px,0)" },
                  //   leave: { transform: "translate3d(0,-40px,0)" },
                  // }}
                  component={myComponent}
                  key={drink.name}
                />
              );
            })}
          </Masonry>
      )
    );
  // return cocktails.length > 0 && <div className="drinkSection">
  //     <InfiniteScroll
  //       dataLength={listState.items.length}
  //       next={fetchMoreData}
  //       hasMore={listState.hasMore}
  //       loader={<Spinner animation="border" role="status" />}
  //       endMessage={<p>End</p>}
  //     >
  //       {listState.items.map((drink) => {
  //         const myComponent = (
  //           <Item
  //             mustHave={mustHave}
  //             favorites={favorites}
  //             using={using}
  //             // key={drink.name}
  //             favoritesPage={favoritesPage}
  //             drink={drink}
  //             // wait={2000}
  //           />
  //         );
  //         return (
  //           <AnimateItem
  //             options={{
  //               config: { mass: 0.3, friction: 10, tension: 50 },
  //               from: {
  //                 transform: `translate3d(${
  //                   random.boolean() ? "" : "-"
  //                 }1000px,0,0)`,
  //               },
  //               enter: { transform: "translate3d(0,0px,0)" },
  //               leave: { transform: "translate3d(0,-40px,0)" },
  //             }}
  //             component={myComponent}
  //             key={drink.name}
  //           />
  //         );
  //       })}
  //     </InfiniteScroll>
  //   </div>
}

export default CocktailsIndex
