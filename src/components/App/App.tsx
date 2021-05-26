import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Routes } from "../../const";
import HomePage from "../../pages/HomePage/HomePage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.HOME} component={HomePage} />
        <Route exact path={Routes.ERROR404} component={ErrorPage} />
        <Redirect to={Routes.HOME} />
      </Switch>
    </Router>
  );
};

export default App;
