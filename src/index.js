import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import HeadBar from "./components/HeadBar/HeadBar";
import FilterPanel from "./components/FilterOptions/FilterPanel";
import MonthView from "./components/MonthView/MonthView";
import Appointments from "./components/Appointments/Appointments";

ReactDOM.render(
  <Fragment>
    <HeadBar />
    <MonthView />
    <FilterPanel />
    <Appointments />
  </Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
