import React from "react";
import * as Service from "../../service/appService";

export default function HeadBar() {

   async function mainUser() {
    let data;
     Service.getId(1, e =>
      e.status === 200 ? (data = e.data) : (data = e.status)
    );
    return data;
  }

  console.log("TCL: HeadBar -> mainUser()", mainUser());

  return (
    <section className='header-section'>
      <header className='header'>
        <h1>My Klatschboard</h1>
        <img src='' alt='profile avatar icon ' />
      </header>
    </section>
  );
}
