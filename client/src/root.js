import React from 'react'
import { Provider } from "react-redux";
import { HashRouter} from "react-router-dom";
import App from "./App";
import history from './history';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter history={history}>
        <App />
      </HashRouter>
    </Provider>
  );
}

export default Root
