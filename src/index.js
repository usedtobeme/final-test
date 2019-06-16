import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import HeadBar from "./components/HeadBar/HeadBar";
import FilterPanel from "./components/FilterOptions/FilterPanel";
import MonthView from "./components/MonthView/MonthView";
import SideBar from "./components/SideBar/SideBar";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={HeadBar} />
    <Route exact path="/" component={MonthView} />
    <Route exact path="/" component={FilterPanel} />
    <Route exact path="/modal" component={SideBar} />
  </Router>,
  document.getElementById("root")
);


