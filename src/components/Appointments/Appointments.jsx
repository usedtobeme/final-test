import React, { useEffect, useState } from "react";
import "./Appointments.scss";
import avatar from "../../assets/Images/avatar.png";
import * as Service from "../../service/appService";
import { Months } from "../../constants";

export default function Appointments(props) {
  const { filter } = props;
  const [dates, setDates] = useState();
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const params = Object.entries(filter).reduce((acc, curr, index) => {
      if (curr[1]) acc[index] = curr[0];
      return acc;
    }, []);

    Service.getFiltered(params, pages, e => {
      setDates(e);
    });
  }, [pages, filter]);

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
    console.log(e);
    const start = new Date(e.appointment.start);
    const end = new Date(e.appointment.end);
    console.log(end)

    var diff = (end - start) / 1000;
    diff /= 60;
    console.log(`${Math.abs(Math.round(diff))} minutes`)
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

  const renderToday = () => {
    if (dates)
      dates.map((e, index) =>
        isToday(new Date(e.appointment.start)) ? (
          <section className={`section-appointments ${e.status}`} key={index}>
            <section className='section-appointments__time'>
              <div className='time'>
                <span className='time__hour'>
                  <span>{formatDate(e)}</span>
                </span>
                <span className='time__duration'>{getDuration(e)}</span>
                <div className='time__separator' />
              </div>
            </section>
            <section className='section-appointments__info'>
              <div className='personal-info'>
                <img src={avatar} className='avatar' alt='avatar' />
                <span>{`${e.first_name} ${e.last_name}`}</span>
                <i className='fas fa-map-marker-alt'>
                  <span className='location'>{e.location.place}</span>
                </i>
              </div>
              <div className='date-status'>
                <span className='date-status__date'>{getMonth(e)}</span>
                <span className={`date-status__status ${e.status}`}>
                  {e.status}
                </span>
              </div>
            </section>
            <section className='section-appointments__actions'>
              <div className='actions-icons'>
                <i className='fas fa-edit' />
                <i className='fas fa-times' />
              </div>
            </section>
          </section>
        ) : null
      );
  };
  const renderUpcoming = () => {
    if (dates)
      return dates.map((e, index) =>
        !isToday(new Date(e.appointment.start)) ? (
          <section className={`section-appointments ${e.status}`} key={index}>
            <section className='section-appointments__time'>
              <div className='time'>
                <span className='time__hour'>
                  <span>{formatDate(e)}</span>
                </span>
                <span className='time__duration'>{getDuration(e)}</span>
                <div className='time__separator' />
              </div>
            </section>
            <section className='section-appointments__info'>
              <div className='personal-info'>
                <img src={avatar} className='avatar' alt='avatar' />
                <span>{`${e.first_name} ${e.last_name}`}</span>
                <i className='fas fa-map-marker-alt'>
                  <span className='location'>{e.location.place}</span>
                </i>
              </div>
              <div className='date-status'>
                <span className='date-status__date'>{getMonth(e)}</span>
                <span className={`date-status__status ${e.status}`}>
                  {e.status}
                </span>
              </div>
            </section>
            <section className='section-appointments__actions'>
              <div className='actions-icons'>
                <i className='fas fa-edit' />
                <i className='fas fa-times' />
              </div>
            </section>
          </section>
        ) : null
      );
  };

  const renderButton = () =>
    dates ? (
      <button onClick={() => setPages(pages + 2)}>Load more</button>
    ) : null;

  return (
    <main className='main-container'>
      <div className='today-appointments'>
        <span className='today-label'>Today</span>
        {renderToday()}
        <div className='today-separator' />
      </div>
      <div className='upcoming-appointments'>{renderUpcoming()}</div>
      {renderButton()}
    </main>
  );
}
