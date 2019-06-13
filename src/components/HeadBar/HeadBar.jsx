import React, { useState, useEffect } from "react";
import * as Service from "../../service/appService";
import "./HeadBarStyle.scss";

export default function HeadBar() {
  const [defaultUser, setDefaultUser] = useState();

  useEffect(() => {
    Service.getUser(e => {
      setDefaultUser(e.data[0]);
    });
  }, []);

  function mainUser() {
    return defaultUser ? defaultUser : "";
  }

  return (
    <section className='header-section'>
      <header className='header'>
        <h1>My Klatschboard</h1>
        <div className='avatar-name'>
          <img src={mainUser().avatar} alt='profile avatar icon' className='avatar' />
          <h3>{`${mainUser().Name} ${mainUser().Last}`}</h3>
        </div>
      </header>
    </section>
  );
}
