import React from 'react';
import './Appointments.scss'
import avatar from "../../assets/Images/avatar.png";


export default function Appointments(){


    return(
<section className="section-appointments">
    <section className="section-appointments__time">

    <div className="time">
        <span className="time__hour"><span>3:30 </span><span>PM</span></span>
        <span className="time__duration">30 minutes</span>
    </div>

    </section>
    <section className="section-appointments__info">
    <div className="personal-info">
        <img src={avatar} className='avatar' alt="avatar"/>
        <span>Maartha puta</span>
    </div>
    <div className="date-status">

    </div>

    </section>
    <section className="section-appointments__actions"></section>
</section>    )

}