import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@Models/userModel";
import { Game } from "@Models/gameModel";

const initialState: Game = {
  source: {
    user: {
      name: "",
      isPlaying: true,
      waitingQueue: [],
      score: 0,
    },
  },
  target: {
    user: {
      name: "",
      isPlaying: true,
      waitingQueue: [],
      score: 0,
    },
  },
  status: "ON_GOING",
};

interface GameChoicePayload {
  user: User;
  choice: "STONE" | "PAPER" | "SCISSOR";
}

interface GameUpdatePayload {
  status: "ON_GOING" | "FINISHED";
  winner?: User;
}

const gameSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      state.source.user = action.payload.source.user;
      state.source.choice = action.payload.source.choice;
      state.target.user = action.payload.target.user;
      state.target.choice = action.payload.source.choice;
      state.status = action.payload.status;
    },
    resetGame: (state) => {
      state.source.choice = undefined;
      state.target.choice = undefined;
      state.status = "ON_GOING";
      state.winner = undefined;
    },
    addChoice: (state, action: PayloadAction<GameChoicePayload>) => {
      if (action.payload.user.name === state.source.user.name) {
        state.source.choice = action.payload.choice;
      } else {
        state.target.choice = action.payload.choice;
      }
    },
    updateGameStatus: (state, action: PayloadAction<GameUpdatePayload>) => {
      state.status = action.payload.status;
      state.winner = action.payload.winner;
    },
  },
});

export const { setGame, resetGame, addChoice, updateGameStatus } =
  gameSlice.actions;

export default gameSlice.reducer;
