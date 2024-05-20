import React from "react";

import { useSelector } from "react-redux";

import PlayerCard from "@Components/PlayerCard/PlayerCard";
import EmptyState from "@Components/EmptyState/EmptyState";
import { AppState } from "@State/store";

import "./PlayerList.scss";

const PlayerList: React.FC = () => {
  const registeredPlayers = useSelector(
    (state: AppState) => state.registeredUsers.users
  );
  const currentUser = useSelector((state: AppState) => state.currentUser);

  return (
    <div className="player-list">
      <h1 className="player-list__title">Players Online</h1>
      {registeredPlayers.length > 1 ? (
        registeredPlayers
          .filter((player) => player.name !== currentUser.name)
          .map((player) => (
            <PlayerCard key={player.name} player={player} showScore={false} />
          ))
      ) : (
        <EmptyState text={"No Players Online"} />
      )}
    </div>
  );
};

export default PlayerList;
