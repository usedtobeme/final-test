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

export default function FilteredPanel(props) {
  const { home, setHome, setSideBar } = props;
  const [selected, setSelected] = useState(state);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  useEffect(() => {
    const items = Object.entries(selected).filter(e => e[0] !== "All" && e[1]);

    if (items.length === 3 || items.length === 0) setSelected(state);
  }, [selected]);

  useEffect(() => {
    if (home) {
      setHome(!home);
      setShow(false);
    }
  }, [home, setHome]);

  useEffect(() => {
    if (width < 960) {
      setSideBar(
        show ? (
          <Sidebar close={close} id={id} edit={edit} changeEdit={changeEdit} />
        ) : null
      );
    } else {
      setSideBar(
        <Sidebar
          close={close}
          edit={edit}
          id={id}
          width={width}
          changeEdit={changeEdit}
        />
      );
    }
  }, [show, edit, id, setSideBar, width]);

  const close = e => {
    if (e) {
      setEdit(false);
      setId(undefined);
    } else {
      setShow(false);
      setEdit(false);
      setId(undefined);
      setSideBar(null);
    }
  };

  const getId = e => {
    setId(e);
    setShow(!show);
  };

  const changeEdit = e => {
    if (e === "true") {
      setEdit(true);
      setShow(true);
    } else if (e === "false") {
      setEdit(false);
      setShow(!show);
    } else {
      setEdit(!edit);
      setShow(!show);
    }
  };

  return (
    <div aria-label='modal-container' className='modal-container'>
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
                value='Pending'
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
            setShow(true);
            setEdit(false);
            setId(undefined);
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
    </div>
  );
}
