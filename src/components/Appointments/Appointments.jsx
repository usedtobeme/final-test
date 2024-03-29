import React, { useEffect, useState } from "react";
import "./Appointments.scss";
import * as Service from "../../service/appService";
import { Months } from "../../constants";

export default function Appointments(props) {
  const { filter, getElement, edit, width } = props;
  const [dates, setDates] = useState();
  const [pages, setPages] = useState(5);
  const [force, setforce] = useState(false);

  useEffect(() => {
    const params = Object.entries(filter).reduce((acc, curr, index) => {
      if (curr[1]) acc[index] = curr[0];
      return acc;
    }, []);

    Service.getFiltered(params, pages, e => {
      setDates(e);
    });
  }, [pages, filter, force, edit]);

  const formatDate = e => {
    const start = new Date(e.appointment.start);
    let hour = start.getHours();
    let minutes = start.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    if (hour >= 12) {
      hour = hour - 12;
      return `${hour}:${minutes} PM`;
    }

    return `${hour}:${minutes} AM`;
  };
  const getDuration = e => {
    let end;
    let start;
    if (dates && dates.length > 0) {
      if (e === "duration") {
        start = new Date(dates[0].appointment.start);
        end = new Date();
      } else {
        start = new Date(e.appointment.start);
        end = new Date(e.appointment.end);
      }
    }
    var diff = (end - start) / 1000;
    diff /= 60;
    return `${Math.abs(Math.round(diff))} minutes`;
  };

  const getMonth = e => {
    const date = new Date(e.appointment.start);
    const day = date.getDate();
    let termination;
    switch (day % 10) {
      case 1:
        termination = "st";
        break;
      case 2:
        termination = "nd";
        break;
      case 3:
        termination = "rd";
        break;
      default:
        termination = "th";
        break;
    }

    return `${Months[date.getMonth()]} ${date.getDate()}${termination}`;
  };

  const isToday = date => {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const cancelDate = (r, e) => {
    r.stopPropagation();
    e.status = "cancelled";
    Service.changeStatus(e, () => {
      setforce(!force);
    });
  };

  const confirmDate = (r, e) => {
    r.stopPropagation();
    e.status = "confirmed ";
    Service.changeStatus(e, () => {
      setforce(!force);
    });
  };

  const clickAppointment = e => {
    e.preventDefault();
    if (e.target.getAttribute("class").includes("edit")) {
      const id = e.currentTarget.getAttribute("element");
      if (id) {
        setforce(!force);
        getElement(id);
        edit("true");
      }
    } else {
      const id = e.currentTarget.getAttribute("element");
      if (id) {
        setforce(!force);
        getElement(id);
        edit("false");
      }
    }
  };

  const markup = (e, index) => (
    <section
      className={`section-appointments ${e.status}`}
      key={index}
      onClick={clickAppointment}
      element={e.id}>
      <section className={`section-appointments__time ${e.status}`}>
        <div className='time'>
          <span className='time__hour'>
            <span className={"date-time-span"}>{formatDate(e)}</span>
          </span>
          <span className='time__duration'>{getDuration(e)}</span>
          <div className='time__separator' />
        </div>
      </section>
      <section className='section-appointments__info'>
        <div className={`personal-info ${e.status}`}>
          <span className='time-separator' />
          <img src={e.avatar} className='avatar' alt='avatar' />
          <div className='name-location'>
            <span className='date-name'>{`${e.first_name} ${
              e.last_name
            }`}</span>
            <i className='fas fa-map-marker-alt'>
              <span className='location'>{e.location.place}</span>
            </i>
          </div>
        </div>
        <div className='date-status'>
          <span className={`date-status__date ${e.status}`}>{getMonth(e)}</span>
          <span className={`date-status__status ${e.status}`}>
            {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
          </span>
        </div>
      </section>

      <section className='section-appointments__actions'>
        {e.status === "cancelled" ? null : (
          <div className='actions-icons'>
            {e.status === "pending" ? (
              <i
                className='appointment fas fa-check'
                onClick={r => confirmDate(r, e)}
              />
            ) : (
              <i
                className='fas fa-edit'
                onClick={() => (width < 960 ? edit() : edit("true"))}
              />
            )}
            <i className='fas fa-times' onClick={r => cancelDate(r, e)} />
          </div>
        )}
      </section>
    </section>
  );

  const renderToday = () => {
    if (dates)
      return dates.map((e, index) =>
        isToday(new Date(e.appointment.start)) ? markup(e, index) : null
      );
  };
  const renderUpcoming = () => {
    if (dates)
      return dates.map((e, index) =>
        !isToday(new Date(e.appointment.start)) ? markup(e, index) : null
      );
  };

  const renderButton = () => {
    return dates ? (
      <button onClick={() => setPages(pages + 2)} className='button load-more'>
        Load more
      </button>
    ) : null;
  };

  return dates ? (
    <section className='main-container'>
      <div className='today-appointments'>
        <div className='today-info'>
          {renderToday()[0] ? (
            <span className='today-label'>Today</span>
          ) : (
            <span className='today-label2'>Nothing today </span>
          )}
          <span className='next-appointment'>{`Meeting in ${getDuration(
            "duration"
          )}`}</span>
        </div>

        {renderToday()}
        <div className='today-separator' />
      </div>
      <div className='upcoming-appointments'>
        <span className='upcoming-label'>Upcoming</span>
        {renderUpcoming()}
      </div>
      {renderButton()}
    </section>
  ) : null;
}
