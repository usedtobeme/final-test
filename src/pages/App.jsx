import React, { Fragment } from "react";
import HeadBar from "../components/HeadBar/HeadBar";
import FilterPanel from "../components/FilterOptions/FilterPanel";

export default function App() {
  return (
    <Fragment>
      <HeadBar />
      <FilterPanel />
    </Fragment>
  );
}
