import React from "react";
import "./Header.scss";

import logo from "@Images/logo.png";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <img
          className="header__logo"
          src={logo}
          alt="Rock Paper Scissor Logo"
        />
      </div>
      <ul className="header__links">
        <li>
          <NavLink
            to="/players"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Players
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/game"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Ongoing game
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
