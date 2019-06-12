import React, { useState, useEffect } from "react";
import * as Service from "../../service/appService";
import "./HeadBarStyle.scss";
import avatar from '../../assets/Images/avatar.png'

export default function HeadBar(props) {
  const [defaultUser, setDefaultUser] = useState();

  useEffect(() => {
    Service.getId(1, e => {
      setDefaultUser(e.data);
    });
  }, []);

  function mainUser() {
    return defaultUser ? defaultUser : "";
  }

  return (
    <section className="header-section">
      <header className="header">
        <h1>My Klatschboard</h1>
        <div className="avatar-name">
          <img
            src={avatar}
            alt="profile avatar icon"
            className="avatar"
          />
          <h3>{`${mainUser().first_name} ${mainUser().last_name}`}</h3>
        </div>
      </header>
    </section>
  );
}
