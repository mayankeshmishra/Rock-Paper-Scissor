import { Store } from "@reduxjs/toolkit";

import { AppState } from "@State/store";
import { addChoice, updateGameStatus } from "@State/slice/gameSlice";
import { increaseUserScore } from "@State/slice/registeredUsersSlice";
import { increaseScore } from "@State/slice/currentUserSlice";
import { User } from "@Models/userModel";
import { GAME_CHOICE, GameUser } from "@Models/gameModel";

export const initializeGamePlay = async (store: Store) => {
  const gamePlayChannel = new BroadcastChannel("game-play");
  gamePlayChannel.onmessage = async (message) => {
    const state: AppState = store.getState();
    let currentGame = state.game;
    const channelMessage = message.data;
    const currentUser = state.currentUser;

    if (
      currentGame.source.user.name === channelMessage.user.name ||
      currentGame.target.user.name === channelMessage.user.name
    ) {
      store.dispatch(
        addChoice({ user: channelMessage.user, choice: channelMessage.choice })
      );
    }

    currentGame = store.getState().game;

    if (currentGame.source.choice && currentGame.target.choice) {
      // Update scores and game
      const winner = evaluateGame(currentGame.source, currentGame.target);
      if (winner) {
        store.dispatch(increaseUserScore(winner.user));
        if (winner.user.name === currentUser.name) {
          store.dispatch(increaseScore());
        }
      }
      store.dispatch(
        updateGameStatus({ status: "FINISHED", winner: winner?.user })
      );
    }
  };
};

const evaluateGame = (source: GameUser, target: GameUser) => {
  switch (true) {
    case source.choice === "STONE" && target.choice === "SCISSOR":
      return source;
    case source.choice === "PAPER" && target.choice === "STONE":
      return source;
    case source.choice === "SCISSOR" && target.choice === "PAPER":
      return source;
    case target.choice === "STONE" && source.choice === "SCISSOR":
      return target;
    case target.choice === "PAPER" && source.choice === "STONE":
      return target;
    case target.choice === "SCISSOR" && source.choice === "PAPER":
      return target;
    default:
      return;
  }
};

export const addGameChoice = (user: User, choice: GAME_CHOICE) => {
  const gamePlayChannel = new BroadcastChannel("game-play");
  gamePlayChannel.postMessage({ user, choice });
};
