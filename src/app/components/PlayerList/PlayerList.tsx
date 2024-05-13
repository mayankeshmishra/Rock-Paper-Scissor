import React, { useEffect, useState } from "react";

import useRegisteredPlayers from "@Hooks/UseRegisteredPlayers";
import PlayerCard from "@Components/PlayerCard/PlayerCard";
import "./PlayerList.scss";

const PlayerList: React.FC = () => {
  const [currentUser, setCurrentUser] = useState("");
  const players = useRegisteredPlayers();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await sessionStorage.getItem("user");
      setCurrentUser(user ?? "");
    };
    getCurrentUser();
  }, []);

  return (
    <div className="player-list">
      <h1 className="player-list__title">Players Online</h1>
      {players &&
        players
          .filter((playerName) => playerName !== currentUser)
          .map((playerName) => (
            <PlayerCard key={playerName} name={playerName} />
          ))}
    </div>
  );
};

export default PlayerList;
