import React, { useState, useEffect } from "react";
import "./SideBar.scss";
import * as Service from "../../service/appService";
const state = {
  first_name: "",
  last_name: "",
  appointment: { start: "", end: "" },
  location: { street: "", place: "" },
  avatar: "",
  phone: "",
  topics: [{}],
  status: "pending"
};

export default function SideBar(props) {
  const { show, mode } = props;
  const randomAvatar = "https://source.unsplash.com/random/100x100";
  const [avatar, setAvatar] = useState();

  const [newDate, setNewDate] = useState(state);

  useEffect(() => {
    Service.getUser(e => {
      setAvatar(e.data[0].avatar);
    });
  }, []);

  useEffect(() => {}, []);

  const onChange = e => {
    const { name, value } = e.target;
    const parent = e.target.getAttribute("parent");

    if (parent) {
      setNewDate({
        ...newDate,
        [parent]: {
          ...newDate[parent],
          [name]: parent === "location" ? value : new Date(value).getTime()
        }
      });
    } else {
      setNewDate({ ...newDate, [name]: value });
    }
    console.log(newDate);
  };

  const onSubmit = e => {
    e.preventDefault();
    newDate.avatar = randomAvatar;

    Service.addNewDate(newDate, res => {
      console.log(res);
    });
  };

  const setTopics = e => {
    const { value } = e.target;
    const topics = value.split(",").map(e => ({ topic: e }));
    setNewDate({ ...newDate, topics: topics });
  };

  // (() => {
  //   for (let i = 1001; i < 1050; i++) {
  //     Service.deleteUser(i, () => null);
  //   }
  // })();

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
          <div className="form-section date-firstname">
            <span>First Name</span>
            <input
              type="text"
              onChange={onChange}
              name="first_name"
              placeholder="E.g. Jon"
              value={newDate.first_name}
              required
            />
          </div>
          <div className="form-section date-lastname">
            <span>Last Name</span>
            <input
              type="text"
              onChange={onChange}
              name="last_name"
              placeholder="E.g. Snow"
              value={newDate.last_name}
              required
            />
          </div>
          <div className="form-section date-phone">
            <span>Phone</span>
            <input
              type="text"
              onChange={onChange}
              name="phone"
              placeholder="E.g. 111-222-333"
              value={newDate.phone}
              required
            />
          </div>
          <div className="form-section date-place">
            <span>Place</span>
            <input
              type="text"
              onChange={onChange}
              name="place"
              parent="location"
              placeholder="E.g. Kings Landing"
              value={newDate.location.place}
              required
            />
          </div>
          <div className="form-section date-street">
            <span>Street</span>
            <input
              type="text"
              onChange={onChange}
              name="street"
              parent="location"
              placeholder="E.g. Shame street"
              value={newDate.location.street}
              required
            />
          </div>
          <div className="form-section date-start">
            <span>Start</span>
            <input
              type="datetime-local"
              onChange={onChange}
              name="start"
              parent="appointment"
              min={new Date().getTime()}
              required
            />
          </div>
          <div className="form-section date-end">
            <span>End</span>
            <input
              type="datetime-local"
              onChange={onChange}
              name="end"
              parent="appointment"
              min={new Date(newDate.appointment.start + 30*60000)}
              required
            />
          </div>
          <div className="form-section date-topics">
            <span>Topics</span>
            <input
              type="text"
              onChange={setTopics}
              name="topics"
              placeholder="E.g night,terrors,dragons"
              value={newDate.topics.map(e => e.topic)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
