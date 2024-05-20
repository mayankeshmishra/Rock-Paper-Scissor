import React from "react";

import { useSelector } from "react-redux";

import PlayerCard from "@Components/PlayerCard/PlayerCard";
import EmptyState from "@Components/EmptyState/EmptyState";
import { AppState } from "@State/store";

import "./LeaderBoard.scss";

const Leaderboard: React.FC = () => {
  const registeredPlayers = useSelector(
    (state: AppState) => state.registeredUsers.users
  );
  const currentUser = useSelector((state: AppState) => state.currentUser);

  return (
    <div className="leaderboard">
      <h1 className="leaderboard__title">Players Leaderboard</h1>
      {registeredPlayers.length ? (
        [...registeredPlayers]
          .sort((a, b) => b.score - a.score)
          .map((player) => (
            <PlayerCard
              key={player.name}
              player={player}
              showScore={true}
              isHighlighted={currentUser.name === player.name}
            />
          ))
      ) : (
        <EmptyState text="No Players Online" />
      )}
    </div>
  );
};

export default Leaderboard;
