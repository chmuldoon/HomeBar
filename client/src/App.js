import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth_actions";
import setAuthToken from "./util/setAuthToken";
import store from "./store";
import './App.css';
import Login from "./components/auth/Login";
import Main from "./components/main/Main";
import PrivateRoute from "./components/routing/PrivateRoute";
import Landing from "./components/layout/Landing";
import Navbar from "./components/main/Navbar";
import CocktailPage from "./components/cocktails/CocktailPage";
const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  window.getState = store.getState;
  return (
    <Provider store={store}>
        <Router>
          <Route exact path="/" component={Landing} />
          <section>
            <div id="main">

            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/main" component={Main} />
              <PrivateRoute exact path="/cocktails/:id" component={CocktailPage} />
              </Switch>
           </div>

          </section>
        </Router>
    </Provider>
  );
}

export default App;
