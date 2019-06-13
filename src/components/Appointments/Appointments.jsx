import React from "react";
import "./Appointments.scss";
import avatar from "../../assets/Images/avatar.png";

export default function Appointments() {
  return (
    <section className='section-appointments'>
      <section className='section-appointments__time'>
        <div className='time'>
          <span className='time__hour'>
            <span>3:30 </span>
            <span>PM</span>
          </span>
          <span className='time__duration'>30 minutes</span>
          <div className='time__separator' />
        </div>
      </section>
      <section className='section-appointments__info'>
        <div className='personal-info'>
          <img src={avatar} className='avatar' alt='avatar' />
          <span>Martha puta</span>
          <i className='fas fa-map-marker-alt'>
            <span className='location'>Location name</span>
          </i>
        </div>
        <div className='date-status'>
          <span className='date-status__date'>September 10TH</span>
          <span className='date-status__status'>Confirmed</span>
        </div>
      </section>
      <section className='section-appointments__actions'>
        <div className='actions-icons'>
          <i className='fas fa-edit' />
          <i className='fas fa-times' />
        </div>
      </section>
    </section>
  );
}
