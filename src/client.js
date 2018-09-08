"use strict";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducers";
//import logger from "redux-logger";
import thunk from "redux-thunk";
import Menu from "./components/menu";
import Footer from "./components/footer";
import LandingPage from "./components/pages/landingPage";
import PlayerPage from "./components/pages/playerPage";
import ScoreBoard from "./components/pages/game";

//const middleware = applyMiddleware(thunk, logger);
const initialState = {};
const middleware = [thunk /* , logger */];
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/admin" component={PlayerPage} />
          <Route path="/game" component={ScoreBoard} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);
render(Routes, document.getElementById("app"));
