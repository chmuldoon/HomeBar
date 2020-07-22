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
import CocktailPage from "./components/cocktails/CocktailPage";
import UsingArea from "./components/main/UsingArea";
import Favorites from './components/cocktails/Favorites'
import Register from "./components/auth/Register";
import Topbar from "./components/main/Topbar";
import CreateCocktail from "./components/cocktails/CreateCocktail";
import RegisterZone from "./components/layout/RegisterZone";
const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, [store]);
  return (
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={RegisterZone} />
      <section>
        <PrivateRoute component={Topbar}/>
        {/* <Topbar /> */}
          <div id="main">
            <div className="mainArea">
              {/* <div className="content"> */}
              <Switch>
                <PrivateRoute exact path="/main" component={Main} />
                <PrivateRoute exact path="/favorites" component={Favorites} />
                <PrivateRoute exact path="/shelf" component={UsingArea} />
                {/* <PrivateRoute exact path="/create" component={CreateCocktail} /> */}

                <PrivateRoute
                  exact
                  path="/cocktails/:id"
                  wait={1000}
                  component={CocktailPage}
                />
              </Switch>
              {/* </div> */}
            </div>
          </div>
      </section>
    </Fragment>
  );
}

export default App;
