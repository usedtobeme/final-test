import React, { useState, useEffect } from "react";
import "./FilterPanelStyle.scss";
import Appointments from "../Appointments/Appointments";

const state = {
  All: true,
  confirmed: false,
  pending: false,
  cancelled: false
};

export default function FilteredPanel() {
  const [selected, setSelected] = useState(state);

  useEffect(() => {
    const numberOfSelectedItems = Object.entries(selected).filter(
      e => e[0] !== "All" && e[1]
    );

    if (numberOfSelectedItems.length === 3||numberOfSelectedItems.length === 0) setSelected(state);
  }, [selected]);

  return (
    <section className='section-filters'>
      <div className='combobox-container' name='select-filters'>
        <span className='show-only'>Show only:</span>
        <ul aria-label='filter-options' className='filter-options'>
          <li className='list-item'>
            <button
              className={
                selected.All
                  ? "button list-item__button"
                  : "button list-item__button-deactivated"
              }
              value='All'
              onClick={() => setSelected(state)}
              aria-label='show all dates'>
              All
            </button>
          </li>
          <li className='list-item' value='confirmed'>
            <button
              className={
                selected.confirmed
                  ? "button list-item__button"
                  : "button list-item__button-deactivated"
              }
              value='Confirmed'
              onClick={() =>
                setSelected({
                  ...selected,
                  confirmed: !selected.confirmed,
                  All: false
                })
              }
              aria-label='filter confirmed dates'>
              Confirmed
              <i className='fas fa-check' />
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                selected.pending
                  ? "button list-item__button"
                  : "button list-item__button-deactivated"
              }
              value='p'
              onClick={() =>
                setSelected({
                  ...selected,
                  pending: !selected.pending,
                  All: false
                })
              }
              aria-label='filter pending dates'>
              Pending
              <i className='far fa-clock' />
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                selected.cancelled
                  ? "button list-item__button"
                  : "button list-item__button-deactivated"
              }
              value='Cancelled'
              onClick={() =>
                setSelected({
                  ...selected,
                  cancelled: !selected.cancelled,
                  All: false
                })
              }
              aria-label='filter canceled dates'>
              Cancelled
              <i className='fa fa-times' />
            </button>
          </li>
        </ul>
      </div>
      <button className='addDatebtn'>
        <i className='fas fa-coffee' />
        Add Klatsch
      </button>
      <Appointments filter={selected}/>
    </section>
  );
}
