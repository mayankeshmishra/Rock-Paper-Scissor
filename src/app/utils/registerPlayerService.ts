import { Store } from "@reduxjs/toolkit";

import { addUser, removeUser } from "@State/slice/registeredUsersSlice";

export const initializeRegisteredPlayers = async (store: Store) => {
  const registeredPlayerChannel = new BroadcastChannel("registeredPlayers");
  registeredPlayerChannel.onmessage = async (message) => {
    const channelMessage = message.data;
    if (channelMessage.status === "JOINED") {
      store.dispatch(addUser(channelMessage.user));
    } else {
      store.dispatch(removeUser(channelMessage.user));
    }
  };
};
