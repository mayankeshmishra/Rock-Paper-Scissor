import React from 'react';
import './Header.scss';

import logo from "@Images/logo.png";

const Header: React.FC = () => {
    return (
      <header className="header">
         <div className="header__logo-wrapper">
            <img className='header__logo' src={logo} alt="Rock Paper Scissor Logo" />
         </div>
         <ul className='header__links'>
            <li>Players</li>
            <li>Ongoing game</li>
            <li>Leaderboard</li>
         </ul>
      </header>
    );
 }

 export default Header;