import React, { useState, useEffect } from "react";
import { Months } from "../../constants";
import * as Service from "../../service/appService";
import "./MonthView.scss";

export default function MonthView(props) {
  const { modal } = props;
  const [currDate, setCurrDate] = useState({
    Month: new Date().getMonth(),
    Year: new Date().getFullYear()
  });

  const [users, setUsers] = useState();
  useEffect(() => {
    Service.getAll(e => {
      setUsers(e.data);
    });
  }, []);

  const checkDateRange = e => {
    return (
      currDate.Month === new Date(e.appointment.start).getMonth() &&
      currDate.Year === new Date(e.appointment.start).getFullYear()
    );
  };
  const getConfirmed = () => {
    if (users)
      return users.filter(e => e.status === "confirmed" && checkDateRange(e))
        .length;
  };
  const getPending = () => {
    if (users)
      return users.filter(e => e.status === "pending" && checkDateRange(e))
        .length;
  };
  const getCancelled = () => {
    if (users)
      return users.filter(e => e.status === "cancelled" && checkDateRange(e))
        .length;
  };

  function setMonthView(e) {
    if (e === -1) {
      if (currDate.Month === 0 && currDate.Year > 2019) {
        setCurrDate({
          Month: 11,
          Year: currDate.Year - 1
        });
      } else if (
        currDate.Month > new Date().getMonth() ||
        currDate.Year > new Date().getFullYear()
      )
        setCurrDate({
          ...currDate,
          Month: currDate.Month - 1
        });
    } else {
      if (currDate.Month === 11) {
        setCurrDate({
          Month: 0,
          Year: currDate.Year + 1
        });
      } else
        setCurrDate({
          ...currDate,
          Month: currDate.Month + 1
        });
    }
  }

  const keyDown = (month, e) => {
    if (e.key === "Enter") {
      setMonthView(month);
    }
  };

  return (
    <section className="section-sidebar">
      <span className="background">
        <section className="section-date">
          <i
            className="fas fa-chevron-left"
            onClick={() => setMonthView(-1)}
            onKeyDown={e => keyDown(-1, e)}
            tabIndex={1}
            aria-label="previous month view"
          />
          <div className="section-date__container">
            <span className="section-date__month">
              {Months[currDate.Month]}
            </span>
            <span className="section-date__year">{currDate.Year}</span>
          </div>
          <i
            className="fas fa-chevron-right"
            onClick={() => setMonthView(1)}
            tabIndex={2}
            onKeyDown={e => keyDown(1, e)}
            aria-label="next month view"
          />
        </section>
      </span>
      <span className="background--2">

      <section className="section-summary">
        <div className="section-summary__container">
          <div className="section-summary__icon section-summary__icon__confirmed">
            <i className="icon fas fa-check" />
          </div>
          <div className="section-summary__text">
            <span>{getConfirmed()}</span>
            <span>Confirmed</span>
          </div>
        </div>
        <div className="section-summary__container">
          <div className="section-summary__icon section-summary__icon__pending">
            <i className="icon far fa-clock" />
          </div>
          <div className="section-summary__text">
            <span>{getPending()}</span>
            <span>Pending</span>
          </div>
        </div>
        <div className="section-summary__container">
          <div className="section-summary__icon section-summary__icon__canceled">
            <i className="icon fas fa-times" />
          </div>
          <div className="section-summary__text">
            <span>{getCancelled()}</span>
            <span>Cancelled</span>
          </div>
        </div>
      </section>
      </span> 
      {modal ? React.cloneElement(modal) : null}
    </section>
  );
}
