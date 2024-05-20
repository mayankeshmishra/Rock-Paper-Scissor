import React from "react";

import { useSelector } from "react-redux";

import { AppState } from "@State/store";
import { inviteUser } from "@Utils/gameInviteService";
import { User } from "@Models/userModel";

import "./PlayerCard.scss";

interface PlayerCardProps {
  player: User;
  showScore: boolean;
  isHighlighted?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  showScore,
  isHighlighted,
}) => {
  const currentUser = useSelector((state: AppState) => state.currentUser);

  /**
   * To invite user for a game
   */
  const handleGameInvite = () => {
    inviteUser(currentUser, player, false);
  };

  return (
    <div
      className={`player-card ${isHighlighted && "player-card--highlighted"}`}
    >
      <h3 className="player-card__name">{player.name}</h3>
      {showScore ? (
        <p className="player-card__score"> {player.score}</p>
      ) : (
        <button className="player-card__action" onClick={handleGameInvite}>
          Invite
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
