import React, { useState, useEffect } from "react";
import * as Service from "../../service/appService";
import "./HeadBarStyle.scss";

export default function HeadBar() {
  const classes = {
    navigation: "navigation-show",
    list: "navigation-show__list-show",
    navigation2: "navigation",
    list2: "navigation__list"
  };
  const [defaultUser, setDefaultUser] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    Service.getUser(e => {
      setDefaultUser(e.data[0]);
    });
  }, []);

  const mainUser = () => (defaultUser ? defaultUser : "");

  return (
    <header className="header">
      <div
        className={show ? "shadow-show" : "shadow-hide"}
        onClick={() => setShow(!show)}
      />
      <nav className={show ? classes.navigation : classes.navigation2} role='navigation'>
        <ul className={show ? classes.list : classes.list2}>
          <li className="navigation__list__item">
            <i className="fab fa-kickstarter-k" />
          </li>
          <li>
            <i
              className="navigation__list__item fas fa-home"
              onClick={() => setShow(!show)}
            />
          </li>
          <li>
            <i className="navigation__list__item far fa-thumbs-up" />
          </li>
          <li>
            <i className="navigation__list__item fas fa-history" />
          </li>
          <li>
            <i className="navigation__list__item fab fa-js-square" />
          </li>
        </ul>
      </nav>
      <h1>My Klatschboard</h1>
      <div className="avatar-name">
        {mainUser().avatar ? (
          <img
            src={mainUser().avatar}
            alt="profile avatar icon"
            className="avatar"
          />
        ) : null  }

        <h3>{`${mainUser().Name} ${mainUser().Last}`}</h3>
      </div>
      <div
        className={show ? "burger-menu open" : "burger-menu"}
        onClick={() => setShow(!show)}
      >
        <div className="bar1" key="b1" />
        <div className="bar2" key="b2" />
        <div className="bar3" key="b3" />
      </div>
      );
    </header>
  );
}
