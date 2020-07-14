import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import Item from "./Item";
const AnimateItem = ({component}) => {
  const [on, toggle] = useState(true)
  const transitions = useTransition(on, null, {
    from: {  opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0}
  });
  return (<div>
      {transitions.map(
      ({ item, key, props }) =>
        item && (
          <animated.div key={key} style={props}>
            {component}
         
          </animated.div>
        )
      )}
    </div>)

}

export default AnimateItem
