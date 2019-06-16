import React, { useState, useEffect } from "react";
import "./SideBar.scss";
import * as Service from "../../service/appService";
const state = {
  first_name: "",
  last_name: "",
  appointment: {},
  location: [{}],
  avatar: "",
  phone: "",
  topics: [],
  status: "pending"
};

export default function SideBar(props) {
  const randomAvatar = "http://www.avatarpro.biz/avatar";
  const [avatar, setAvatar] = useState();

  const [newDate, setNewDate] = useState(state);

  useEffect(() => {
    Service.getUser(e => {
      setAvatar(e.data[0].avatar);
    });
  }, []);

  const onChange = e => {
    const { name, value } = e.target;
    const parent = e.target.getAttribute("parent");
    if (parent === "location") {
      newDate.location[0][name] = value;
    } else if (parent === "appointment") {
      newDate.appointment[name] = new Date(value).getTime();
    } else {
      setNewDate({ ...newDate, [name]: value });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    newDate.avatar = randomAvatar;
    Service.addNewDate(newDate, res => {
      console.log(res);
    });
  };

  //   (() => {
  //     for (let i = 1001; i < 1050; i++) {
  //       Service.deleteUser(i, () => null);
  //     }
  //   })();

  return (
    <div className="backdropStyle">
      <div className="modalStyle">
        <div className="modal-details">
          <span className="modal-label">Klatsch Details</span>
          <span className={`date-status__status pending`}>Pending</span>
          <div className="users-info">
            <img
              src={newDate.avavtar ? newDate.avatar : avatar}
              alt="user avavatar"
              className="user-avatar"
            />
            <i className="fas fa-mug-hot" />
            <i className="fas fa-question" />
          </div>
        </div>
        <form className="form" type="submit" onSubmit={onSubmit}>
          <div className="date-name">
            <span>First Name</span>
            <input type="text" onChange={onChange} name="first_name" />
          </div>
          <div className="date-name">
            <span>Last Name</span>
            <input type="text" onChange={onChange} name="last_name" />
          </div>
          <div className="date-name">
            <span>Phone</span>
            <input type="text" onChange={onChange} name="phone" />
          </div>
          <div className="date-name">
            <span>Place</span>
            <input
              type="text"
              onChange={onChange}
              name="place"
              parent="location"
            />
          </div>
          <div className="date-name">
            <span>Street</span>
            <input
              type="text"
              onChange={onChange}
              name="street"
              parent="location"
            />
          </div>
          <div className="date-name">
            <span>Start</span>
            <input
              type="datetime-local"
              onChange={onChange}
              name="start"
              parent="appointment"
            />
            <span>End</span>
            <input
              type="datetime-local"
              onChange={onChange}
              name="end"
              parent="appointment"
            />
          </div>
          <div className="date-name">
            <span>Topics</span>
            <input type="text" onChange={onChange} name="topics" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
