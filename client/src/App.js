import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth_actions";
import setAuthToken from "./util/setAuthToken";
import store from "./store";

import './App.css';

const App = () => {
  return (
    <Provider store={store} >
      <Router>
        
      </Router>
    </Provider>
  );
}

export default App;
