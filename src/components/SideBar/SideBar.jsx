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
  avatar: undefined,
  phone: "",
  topics: [{}],
  status: "pending",
  gender: "male"
};

export default function SideBar(props) {
  const { close, id, edit, wdith, changeEdit } = props;
  const [avatar, setAvatar] = useState();
  const [currDate, setCurrDate] = useState();
  const [newDate, setNewDate] = useState(state);
  const [defaultAvatar, setDefaultAvatar] = useState();
  const [force, setforce] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    Service.getUser(e => {
      setAvatar(e.data[0].avatar);
    });
    if (id)
      Service.getId(id, e => {
        setCurrDate(e.data);
      });
  }, [id, force]);

  useEffect(() => {
    if (currDate && edit && id) {
      currDate.appointment.start = moment(currDate.appointment.start).format(
        "YYYY-MM-DDTHH:mm"
      );
      currDate.appointment.end = moment(currDate.appointment.end).format(
        "YYYY-MM-DDTHH:mm"
      );

      setNewDate(currDate);
    } else {
      setNewDate(state);
    }
  }, [edit, currDate, id]);

  useEffect(() => {
    Service.randomAvatar(newDate.gender, e => {
      setDefaultAvatar(e);
    });
  }, [newDate.gender]);

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
  };
  const onSubmit = e => {
    e.preventDefault();

    newDate.appointment.start = new Date(newDate.appointment.start).getTime();
    newDate.appointment.end = new Date(newDate.appointment.end).getTime();
    if (!edit)
      Service.addNewDate(newDate, res => {
        changeEdit("false");
        setforce(!force);
        setCurrDate(newDate);
        if (res.status === 201 && wdith < 960) close();
      });
    else {
      Service.changeStatus(newDate, res => {
        if (res.status === 201 && wdith < 960) close();
      });
    }
  };

  const prevStep = () => {
    if (!newDate.avatar) setNewDate({ ...newDate, avatar: defaultAvatar });
  };
  const setTopics = e => {
    const { value } = e.target;
    const topics = value.split(",").map(e => ({ topic: e }));
    setNewDate({ ...newDate, topics: topics });
  };

  const chooseAvatar = () => inputRef.current.click();

  const fileSelected = e => {
    Service.uploadImg(e.target.files[0], e => {
      if (e.status === 200) {
        setNewDate({ ...newDate, avatar: e.data.data.link });
      }
    });
  };

  const handleClick = e => {
    if (e.target.getAttribute("class") === "backdropStyle") close();
  };

  const changeStatus = e => {
    currDate.status = e;
    Service.changeStatus(currDate, () => {
      setforce(!force);
    });
  };
  const preview = () =>
    currDate ? (
      <aside className='backdropStyle' onClick={handleClick}>
        <div className='modalStyle'>
          <section className='curr-modal-details'>
            <span className='modal-label'>Klatsch Details</span>
            <span className={`sideBar-status__status ${currDate.status}`}>
              {currDate.status.charAt(0).toUpperCase() +
                currDate.status.slice(1)}
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
                <span className='curr-name'>{`${currDate.first_name} ${
                  currDate.last_name
                }`}</span>
                <span className='curr-phone'>{currDate.phone}</span>
              </div>
            </div>
          </section>
          <section className='second-panel'>
            <div className='second-panel--container'>
              <span className='second-panel--label'>Date&Time</span>
              <span className='second-panel--value'>
                {`${moment(currDate.appointment.start).format("LT")} - ${moment(
                  currDate.appointment.end
                ).format("LT")}`}
              </span>
            </div>
            <div className='second-panel--container panel-location'>
              <span className='second-panel--label'>Location</span>
              <span className='second-panel--second-label'>
                {currDate.location.place}
              </span>
              <span className='second-panel--value'>
                {currDate.location.street}
              </span>
            </div>
            <div className='second-panel--container panel-topics'>
              <span className='second-panel--label'>Topics</span>
              <div className='topics-container'>
                {currDate.topics.map((e, i) =>
                  currDate.topics[i + 1] ? (
                    <span className='second-panel--value' key={i}>{`${
                      e.topic
                    },`}</span>
                  ) : (
                    <span className='second-panel--value' key={i}>{`${
                      e.topic
                    }`}</span>
                  )
                )}
              </div>
            </div>
          </section>
          <section className='third-panel--container'>
            <div className='second-panel--container panel-status'>
              <span className='second-panel--label'>Status</span>
            </div>
            <div className='third-panel--actions'>
              {currDate.status === "pending" ? (
                <React.Fragment>
                  <span
                    className='action'
                    onClick={() => changeStatus("confirmed")}>
                    Confirm Klatsch
                  </span>
                  <span
                    className='action'
                    onClick={() => changeStatus("cancelled")}>
                    Cancel Klatsch
                  </span>
                </React.Fragment>
              ) : currDate.status === "confirmed" ? (
                <span
                  className='action'
                  onClick={() => changeStatus("cancelled")}>
                  Cancel Klatsch
                </span>
              ) : (
                <span>Nothing to show</span>
              )}
            </div>
          </section>
        </div>
      </aside>
    ) : null;

  const addNew = () =>
    currDate || !edit ? (
      <aside className='backdropStyle'>
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
                      alt='date avatar'
                      className='user-avatar'
                      onClick={chooseAvatar}
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
                onBlur={prevStep}
                required
              />
            </div>
            <div className='button-container'>
              <button className='submit-button' type='submit'>
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
      </aside>
    ) : null;

  return id && !edit ? preview() : addNew();
}
