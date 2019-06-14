import React, { useEffect, useState } from "react";
import "./Appointments.scss";
import avatar from "../../assets/Images/avatar.png";
import * as Service from "../../service/appService";
import { Months } from "../../constants";

export default function Appointments() {
  const [dates, setDates] = useState();
  const [results, setResutls] = useState(1);

  useEffect(() => {
    Service.getAll(e => setDates(e.data));
  }, []);

  if (dates) {
    console.log(dates);
  }

  const formatDate = e => {
    const start = new Date(e.appointment[0].start);
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
    const start = new Date(e.appointment[0].start);
    const end = new Date(e.appointment[0].end);

    var diff = (end.getTime() - start.getTime()) / 1000;
    diff /= 60;
    return `${Math.abs(Math.round(diff))} minutes`;
  };

  const getMonth = e => {
    const date = new Date(e.appointment[0].start);
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

  return (
    <main>
      {dates
        ? dates.slice(0, results).map((e, index) => (
            <section className={`section-appointments ${e.status}`} key={index}>
              <section className="section-appointments__time">
                <div className="time">
                  <span className="time__hour">
                    <span>{formatDate(e)}</span>
                  </span>
                  <span className="time__duration">{getDuration(e)}</span>
                  <div className="time__separator" />
                </div>
              </section>
              <section className="section-appointments__info">
                <div className="personal-info">
                  <img src={avatar} className="avatar" alt="avatar" />
                  <span>{`${e.first_name} ${e.last_name}`}</span>
                  <i className="fas fa-map-marker-alt">
                    <span className="location">{e.location[0].place}</span>
                  </i>
                </div>
                <div className="date-status">
                  <span className="date-status__date">{getMonth(e)}</span>
                  <span className={`date-status__status ${e.status}`}>
                    {e.status}
                  </span>
                </div>
              </section>
              <section className="section-appointments__actions">
                <div className="actions-icons">
                  <i className="fas fa-edit" />
                  <i className="fas fa-times" />
                </div>
              </section>
            </section>
          ))
        : null}
      {dates ? (
        <button onClick={() => setResutls(results + 2)}>Load more</button>
      ) : null}
    </main>
  );
}
