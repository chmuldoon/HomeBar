import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
const AnimateItem = ({
  component,
  base = {},
  options = {
    from: { opacity: 0, ...base },
    enter: { opacity: 1, ...base },
    leave: { opacity: 0, ...base },
  },
}) => {
  const [on, toggle] = useState(true);
  const transitions = useTransition(on, null, options);
  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          {component}
        </animated.div>
      )
  );
};

export default AnimateItem
