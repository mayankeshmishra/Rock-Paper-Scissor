import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "@State/store";
import { removeUser } from "@State/slice/currentUserSlice";

import logo from "@Images/logo.png";
import "./Header.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: AppState) => state.currentUser);
  /**
   * TO Logout user and navigate to register page
   */
  const handleLogout = () => {
    dispatch(removeUser(currentUser));
    navigate("/register");
  };

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
            to="/"
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
        <li>
          <button className="header__action" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
