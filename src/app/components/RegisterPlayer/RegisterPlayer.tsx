import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useRegisteredPlayers from '@Hooks/UseRegisteredPlayers';
import Snackbar from 'awesome-snackbar';
import './RegisterPlayer.scss'

const RegisterPlayer: React.FC = () => {
    const [playerName, setPlayerName] = useState('');
    const registeredPlayers = useRegisteredPlayers();
    const navigate = useNavigate();

    const handleRegisterUser = () => {
        if(registeredPlayers.includes(playerName)) {
            new Snackbar('User Already exists', {theme: 'light', position: 'bottom-right'});
        } else {
            const playerBroadcastChannel = new BroadcastChannel('players');
            playerBroadcastChannel.postMessage(playerName);
            sessionStorage.setItem('user', playerName)
            navigate('/players');
        }
    }

    return (
    <div className="register">
        <h1 className="register__title">Register with a cool name</h1>
        <div className="register__form">
            <input className="register__field" placeholder='Enter Username' type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button className="register__button" type="submit" onClick={handleRegisterUser} >Register</button>
        </div>
    </div>);
}

export default RegisterPlayer;