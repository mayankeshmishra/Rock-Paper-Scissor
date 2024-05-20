import React, { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "awesome-snackbar";

import { AppState } from "@State/store";
import { setUser } from "@State/slice/currentUserSlice";

import "./RegisterPlayer.scss";

const RegisterPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const currentPlayer = useSelector((state: AppState) => state.currentUser);
  const registeredPlayers = useSelector(
    (state: AppState) => state.registeredUsers.users
  );

  /**
   * To register user in the game
   */
  const handleRegisterUser = (): void => {
    if (registeredPlayers.find((player) => player.name === playerName)) {
      new Snackbar("User Already exists", {
        theme: "light",
        position: "bottom-right",
      });
    } else {
      const user = {
        name: playerName,
        isPlaying: false,
        waitingQueue: [],
        score: 0,
      };
      dispatch(setUser(user));
      navigate("/");
    }
  };

  return currentPlayer.name ? (
    <Navigate to={"/"} />
  ) : (
    <div className="register">
      <h1 className="register__title">Register with a cool name</h1>
      <div className="register__form">
        <input
          className="register__field"
          placeholder="Enter Username"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          className="register__button"
          type="submit"
          onClick={handleRegisterUser}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPlayer;
