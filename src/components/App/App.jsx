import React, { useState } from "react";
import HeadBar from "../HeadBar/HeadBar";
import FilterPanel from "../FilterOptions/FilterPanel";
import MonthView from "../MonthView/MonthView";
import NavBar from "../Navigation/NavBar";
import "./App.scss";

export default function App() {
  const [show, setShow] = useState(false);
  const [home, setHome] = useState(false);
  const [sideBar, setSidebar] = useState();

  function showMenu(e) {
    if (window.innerWidth < 960) setShow(e);
  }
  function changeHome(e) {
    console.log("da");
    if (window.innerWidth < 960) setHome(e);
  }

  return (
    <div className='page-container'>
      <NavBar show={show} home={home} changeHome={showMenu} />
      <section className='main-content'>
        <HeadBar showMenu={showMenu} show={show} />
        <section className='main-content--no-header'>
          <MonthView modal={sideBar} />
          <FilterPanel
            home={home}
            setHome={changeHome}
            setSideBar={setSidebar}
          />
        </section>
      </section>
    </div>
  );
}
