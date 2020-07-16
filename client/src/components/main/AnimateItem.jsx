import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import Item from "./Item";
const AnimateItem = ({
  component,
  options = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  },
}) => {
  const { from, enter, leave } = options;
  const [on, toggle] = useState(true);
  const transitions = useTransition(on, null, options);
  debugger
  return (
    <div>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {component}
            </animated.div>
          )
      )}
    </div>
  );
};

export default AnimateItem
