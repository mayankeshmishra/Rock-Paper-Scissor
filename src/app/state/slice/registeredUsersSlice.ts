import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@Models/userModel";

interface RegisteredUsers {
  users: User[];
}

const initialState: RegisteredUsers = {
  users: [],
};

const registeredUsersSlice = createSlice({
  name: "registeredUsers",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    increaseUserScore: (state, action: PayloadAction<User>) => {
      state.users.find((user) => user.name === action.payload.name)!.score += 1;
    },
    removeUser: (state, action: PayloadAction<User>) => {
      const index = state.users.indexOf(action.payload);
      state.users.splice(index, 1);
    },
  },
});

export const { addUser, removeUser, increaseUserScore } =
  registeredUsersSlice.actions;

export default registeredUsersSlice.reducer;
