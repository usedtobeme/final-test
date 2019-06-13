import React from 'react';
import './Appointments.scss'

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

    </section>
    <section className="section-appointments__actions"></section>
</section>    )

}