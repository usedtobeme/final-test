import React, { useState, useEffect } from "react";
import * as Service from "../../service/appService";
import "./HeadBarStyle.scss";

export default function HeadBar(props) {
  const { showMenu, show } = props;
  const [defaultUser, setDefaultUser] = useState();
  useEffect(() => {
    Service.getUser(e => {
      setDefaultUser(e.data[0]);
    });
  }, []);

  const mainUser = () => (defaultUser ? defaultUser : "");

  return (
    <header className='header'>
      <div
        className={show ? "shadow-show" : "shadow-hide"}
        onClick={() => showMenu(!show)}
      />
      <h1>My Klatschboard</h1>
      <div className='avatar-name'>
        {mainUser().avatar ? (
          <img
            src={mainUser().avatar}
            alt='profile avatar icon'
            className='avatar'
          />
        ) : null}

        <h3>{`${mainUser().Name} ${mainUser().Last}`}</h3>
      </div>
      <button className='hidden-button'>
        <div
          className={show ? "burger-menu open" : "burger-menu"}
          onClick={() => showMenu(!show)}>
          <div className='bar1' key='b1' />
          <div className='bar2' key='b2' />
          <div className='bar3' key='b3' />
        </div>
      </button>
    </header>
  );
}
