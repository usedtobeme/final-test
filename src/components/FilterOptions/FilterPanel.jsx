import React, { useState, useEffect } from "react";
import "./FilterPanelStyle.scss";
import Appointments from "../Appointments/Appointments";
import Sidebar from "../SideBar/SideBar";

const state = {
  All: true,
  confirmed: false,
  pending: false,
  cancelled: false
};

export default function FilteredPanel() {
  const [selected, setSelected] = useState(state);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const items = Object.entries(selected).filter(e => e[0] !== "All" && e[1]);

    if (items.length === 3 || items.length === 0) setSelected(state);
  }, [selected]);

  useEffect(() => {}, [edit]);

  const renderModal = () => {
    return show ? <Sidebar close={close} id={id} edit={edit} /> : null;
  };

  const close = () => {
    console.log("a");
    setShow(!show);
    setEdit(false);
    setId(undefined);
  };

  const getId = e => {
    console.log("b");

    setId(e);
    setShow(!show);
  };

  const changeEdit = () => {
    console.log("c");

    setEdit(!edit);
    setShow(!show);
  };

  return (
    <div aria-label='modal-container'>
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
                <i className='filter fas fa-check' />
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
        <button
          className='addDatebtn'
          onClick={() => {
            setShow(!show);
          }}>
          <i className='fas fa-coffee' />
          Add Klatsch
        </button>
        <Appointments
          filter={selected}
          show={show}
          getElement={getId}
          edit={changeEdit}
        />
      </section>
      {renderModal()}
    </div>
  );
}
