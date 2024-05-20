import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@Models/userModel";

const initialState: User = {
  name: "",
  isPlaying: false,
  waitingQueue: [],
  score: 0,
};

const currentUserSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const channel = new BroadcastChannel("registeredPlayers");
      channel.postMessage({ user: action.payload, status: "JOINED" });
      state.name = action.payload.name;
      state.isPlaying = action.payload.isPlaying;
      state.waitingQueue = action.payload.waitingQueue;
      state.score = action.payload.score;
    },
    removeUser: (state, action: PayloadAction<User>) => {
      const channel = new BroadcastChannel("registeredPlayers");
      channel.postMessage({ user: action.payload, status: "LEFT" });
      state.name = "";
      state.isPlaying = false;
      state.waitingQueue = [];
      state.score = 0;
    },
    increaseScore: (state) => {
      state.score += 1;
    },
    updatePlayingStatus: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    addGameToWaitingQueue: (state, action) => {
      state.waitingQueue.push(action.payload);
    },
  },
});

export const {
  setUser,
  removeUser,
  increaseScore,
  addGameToWaitingQueue,
  updatePlayingStatus,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
