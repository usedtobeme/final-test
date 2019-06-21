import React from "react";
import "./NavBar.scss";

const classes = {
  navigation: "navigation-show",
  list: "navigation-show__list-show",
  navigation2: "navigation",
  list2: "navigation__list"
};

export default function NavBar(props) {
  const { show, changeHome } = props;
  return (
    <nav
      className={show ? classes.navigation : classes.navigation2}
      role='navigation'>
      <ul className={show ? classes.list : classes.list2}>
        <li className='navigation__list__item'>
          <i className='fab fa-kickstarter-k' />
        </li>
        <li>
          <i
            className='navigation__list__item fas fa-home'
            onClick={() => changeHome(!show)}
          />
        </li>
        <li>
          <i className='navigation__list__item far fa-thumbs-up' />
        </li>
        <li>
          <i className='navigation__list__item  far fa-bell'>
            <i className='far fa-circle' />
          </i>
        </li>
        <li>
          <i className='navigation__list__item fas fa-history' />
        </li>
      </ul>
    </nav>
  );
}
