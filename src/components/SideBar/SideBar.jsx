import React, { useState, useEffect, useRef } from "react";
import "./SideBar.scss";
import * as Service from "../../service/appService";
import moment from "moment";

const state = {
  first_name: "",
  last_name: "",
  appointment: {
    start: moment().format("YYYY-MM-DDTHH:mm"),
    end: moment()
      .add(1, "hour")
      .format("YYYY-MM-DDTHH:mm")
  },
  location: { street: "", place: "" },
  avatar: "",
  phone: "",
  topics: [{}],
  status: "pending",
  gender: "male"
};

export default function SideBar(props) {
  const { close, id } = props;
  const [avatar, setAvatar] = useState();
  const [currDate, setCurrDate] = useState();
  const [newDate, setNewDate] = useState(state);
  const inputRef = useRef(null);

  useEffect(() => {
    Service.getUser(e => {
      setAvatar(e.data[0].avatar);
    });

    if (id)
      Service.getId(id, e => {
        setCurrDate(e.data);
      });
  }, [id]);

  console.log(currDate);

  const onChange = e => {
    const { name, value } = e.target;
    const parent = e.target.getAttribute("parent");

    if (parent) {
      setNewDate({
        ...newDate,
        [parent]: {
          ...newDate[parent],
          [name]: value
        }
      });
    } else {
      setNewDate({ ...newDate, [name]: value });
    }

    if (name === "gender") {
      Service.randomAvatar(value, e => {
        setNewDate({ ...newDate, avatar: e, gender: value });
      });
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    newDate.appointment.start = new Date(newDate.appointment.start).getTime();
    newDate.appointment.end = new Date(newDate.appointment.end).getTime();

    Service.addNewDate(newDate, res => {
      close();
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

  const chooseAvatar = () => inputRef.current.click();

  const fileSelected = e => {
    Service.uploadImg(e.target.files[0], e => {
      if (e.status === 200) {
        setNewDate({ ...newDate, avatar: e.data.data.link });
      }
    });
  };

  const preview = () =>
    currDate ? (
      <div className='backdropStyle' onClick={() => close()}>
        <div className='modalStyle'>
          <div className='curr-modal-details'>
            <span className='modal-label'>Klatsch Details</span>
            <span className={`sideBar-status__status ${currDate.status}`}>
              {currDate.status}
            </span>
            <div className='curr-users-info'>
              <div className='curr-avatars'>
                <img src={avatar} alt='user avavatar' className='user-avatar' />
                <i className='fas fa-mug-hot' />
                <img
                  src={currDate.avatar}
                  alt='date avavatar'
                  className='user-avatar'
                />
              </div>
              <div className='curr-first-info'>
                <span className='curr-name'>{`${currDate.first_name} ${currDate.last_name}`}</span>
                <span className='curr-phone'>{currDate.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const addNew = () => (
    <div className='backdropStyle'>
      <div className='modalStyle'>
        <div className='modal-details'>
          <span className='modal-label'>Klatsch Details</span>
          <span className={`date-status__status pending`}>Pending</span>
          <div className='users-info'>
            {avatar ? (
              <img src={avatar} alt='user avavatar' className='user-avatar' />
            ) : null}
            <i className='fas fa-mug-hot' />
            {
              <form className='avatar-form'>
                <input
                  type='file'
                  ref={inputRef}
                  className='image-input'
                  onChange={fileSelected}
                />
                {newDate.avatar ? (
                  <img
                    src={newDate.avatar}
                    alt='date avavatar'
                    className='user-avatar'
                  />
                ) : (
                  <div className='date-avatar'>
                    <i className='fas fa-question' onClick={chooseAvatar} />
                    <span>Upload avatar</span>
                  </div>
                )}
              </form>
            }
          </div>
        </div>
        <form className='form' type='submit' onSubmit={onSubmit}>
          <div className='form-section date-firstname'>
            <span>First Name</span>
            <input
              type='text'
              onChange={onChange}
              name='first_name'
              placeholder='E.g. Jon'
              value={newDate.first_name}
              required
            />
          </div>
          <div className='form-section date-lastname'>
            <span>Last Name</span>
            <input
              type='text'
              onChange={onChange}
              name='last_name'
              placeholder='E.g. Snow'
              value={newDate.last_name}
              required
            />
          </div>
          <div className='form-section date-gender'>
            <span>Gender</span>
            <select onChange={onChange} name='gender' required>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className='form-section date-phone'>
            <span>Phone</span>
            <input
              type='text'
              onChange={onChange}
              name='phone'
              placeholder='E.g. 111-222-333'
              value={newDate.phone}
              required
            />
          </div>
          <div className='form-section date-place'>
            <span>Place</span>
            <input
              type='text'
              onChange={onChange}
              name='place'
              parent='location'
              placeholder='E.g. Kings Landing'
              value={newDate.location.place}
              required
            />
          </div>
          <div className='form-section date-street'>
            <span>Street</span>
            <input
              type='text'
              onChange={onChange}
              name='street'
              parent='location'
              placeholder='E.g. Shame street'
              value={newDate.location.street}
              required
            />
          </div>
          <div className='form-section date-start'>
            <span>Start</span>
            <input
              type='datetime-local'
              onChange={onChange}
              name='start'
              parent='appointment'
              min={moment().format("YYYY-MM-DDTHH:mm")}
              value={newDate.appointment.start}
              required
            />
          </div>
          <div className='form-section date-end'>
            <span>End</span>
            <input
              type='datetime-local'
              onChange={onChange}
              name='end'
              parent='appointment'
              value={newDate.appointment.end}
              min={newDate.appointment.start}
              required
            />
          </div>
          <div className='form-section date-topics'>
            <span>Topics</span>
            <input
              type='text'
              onChange={setTopics}
              name='topics'
              placeholder='E.g night,terrors,dragons'
              value={newDate.topics.map(e => e.topic)}
              required
            />
          </div>
          <div className='button-container'>
            <button type='submit' className='submit-button'>
              Submit
            </button>
            <button
              className='cancel-button'
              onClick={() => {
                close();
              }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return <>{id ? preview() : addNew()}</>;
}
