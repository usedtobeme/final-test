import React, { useState, useEffect } from "react";
import "./FilterPanelStyle.scss";

const state = {
  All: true,
  Confirmed: false,
  Pending: false,
  Canceled: false
};

export default function FilteredPanel() {
  const [selected, setSelected] = useState(state);

  useEffect(() => {}, [selected]);
  const handleClick = e => {
    const name = e.target.value;

    if (name === "All") setSelected(state);
    else {
      setSelected({ ...selected, [name]: !selected.name });
      const numberOfSelectedItems = Object.entries(selected).filter(
        e => e[0] !== "All" && e[1]
      );
      console.log(numberOfSelectedItems);

      if (numberOfSelectedItems.length === 3) setSelected(state);
      else {
        setSelected({
          ...selected,
          All: false,
          [name]: !selected[name]
        });
      }
    }
  };
  return (
    <section className="section-filters">
      <div className="combobox-container" name="select-filters">
        <span>Show only:</span>
        <ul aria-label="filter-options" className="whole-list">
          <li className="list-item">
            <button
              className={
                selected.All
                  ? "list-item__button"
                  : "list-item__button-deactivated"
              }
              value="All"
              onClick={e => {
                setSelected(state);
              }}
            >
              All
            </button>
          </li>
          <li className="list-item" value="confirmed">
            <button
              className={
                selected.Confirmed
                  ? "list-item__button"
                  : "list-item__button-deactivated"
              }
              value="Confirmed"
              onClick={() => {
                setSelected({ ...selected, Confirmed: !selected.Confirmed });
              }}
            >
              Confirmed
              <i className="fas fa-check" />
            </button>
          </li>
          <li className="list-item">
            <button
              className={
                selected.Pending
                  ? "list-item__button"
                  : "list-item__button-deactivated"
              }
              value="Pending"
              onClick={e => {
                setSelected(e.target.value);
              }}
            >
              Pending
              <i className="far fa-clock" />
            </button>
          </li>
          <li className="list-item">
            <button
              className={
                selected.Canceled
                  ? "list-item__button"
                  : "list-item__button-deactivated"
              }
              value="Canceled"
              onClick={e => {
                setSelected(e.target.value);
              }}
            >
              Canceled
              <i className="fa fa-times" />
            </button>
          </li>
        </ul>
      </div>
      <button className="addDatebtn">
        <i className="fas fa-coffee" />
        Add Klastch
      </button>
    </section>
  );
}
