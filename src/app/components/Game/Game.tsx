import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "@State/store";
import { resetGame } from "@State/slice/gameSlice";
import { updatePlayingStatus } from "@State/slice/currentUserSlice";
import { addGameChoice } from "@Utils/gamePlayService";
import { inviteUser } from "@Utils/gameInviteService";
import { GAME_CHOICE } from "@Models/gameModel";

import RockIcon from "@Images/icon-rock.svg";
import ScissorIcon from "@Images/icon-scissors.svg";
import PaperIcon from "@Images/icon-paper.svg";
import TriangleBackground from "@Images/bg-triangle.svg";
import "./Game.scss";

const Game: React.FC = () => {
  const game = useSelector((state: AppState) => state.game);
  const currentUser = useSelector((state: AppState) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [player, opponent] =
    game.source.user.name === currentUser.name
      ? [game.source, game.target]
      : [game.target, game.source];

  /**
   * To add game choice for player
   * @param choice Choice of the user - 'STONE' | 'PAPER' | 'SCISSOR'
   */
  const handleGameChoice = (choice: GAME_CHOICE) => {
    addGameChoice(currentUser, choice);
  };

  /**
   * To Exit the current game
   */
  const handleExitGame = (): void => {
    dispatch(resetGame());
    dispatch(updatePlayingStatus(false));
    navigate("/");
  };

  /**
   * T0 re-invite opponent for another game
   */
  const reInvite = (): void => {
    inviteUser(player.user, opponent.user, true);
  };

  return (
    <div className="game">
      <div className="game__score-container">
        <h2 className="game__title">Rock Paper Scissors</h2>
        <div className="game__score">
          <p className="game__score-placeholder">Score</p>
          <p className="game__score-text">{currentUser.score}</p>
        </div>
      </div>
      {game.status === "ON_GOING" && !player.choice ? (
        <div className="game__controls">
          <img
            className="game__background"
            src={TriangleBackground}
            alt="triangle background"
          />
          <div className="game__controls-wrapper">
            <div
              className="game__control game__control--rock"
              onClick={() => handleGameChoice("STONE")}
            >
              <img src={RockIcon} alt="Rock" />
            </div>
            <div
              className="game__control game__control--paper"
              onClick={() => handleGameChoice("PAPER")}
            >
              <img src={PaperIcon} alt="Paper" />
            </div>
          </div>
          <div
            className="game__control game__control--scissor"
            onClick={() => handleGameChoice("SCISSOR")}
          >
            <img src={ScissorIcon} alt="Scissor" />
          </div>
        </div>
      ) : (
        <>
          <div className="game__result">
            <div className="game__result-card">
              <p className="game__result-title">You Picked</p>
              <div
                className={`game__control game__control--${
                  player.choice === "STONE"
                    ? "rock"
                    : player.choice === "PAPER"
                    ? "paper"
                    : "scissor"
                }`}
              >
                <img
                  src={
                    player.choice === "STONE"
                      ? RockIcon
                      : player.choice === "PAPER"
                      ? PaperIcon
                      : ScissorIcon
                  }
                  alt="Rock"
                />
              </div>
            </div>
            {game.status === "FINISHED" && (
              <div className="game__actions">
                <p className="game__result-text">
                  {game.winner
                    ? game.winner.name === player.user.name
                      ? "You Win"
                      : "You Lose"
                    : "Draw"}
                </p>
                <button className="game__replay" onClick={reInvite}>
                  Play Again
                </button>
              </div>
            )}
            <div className="game__result-card">
              <p className="game__result-title">{opponent.user.name} Picked</p>
              <div
                className={`game__control game__control--${
                  opponent.choice === "STONE"
                    ? "rock"
                    : opponent.choice === "PAPER"
                    ? "paper"
                    : opponent.choice === "SCISSOR"
                    ? "scissor"
                    : "default"
                }`}
              >
                {opponent.choice && (
                  <img
                    src={
                      opponent.choice === "STONE"
                        ? RockIcon
                        : opponent.choice === "PAPER"
                        ? PaperIcon
                        : ScissorIcon
                    }
                    alt="Rock"
                  />
                )}
              </div>
            </div>
          </div>
          <button className="game__action-btn" onClick={handleExitGame}>
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default Game;
