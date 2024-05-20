import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import * as REDUX_PERSIST from "redux-persist";

import registeredUsers from "@State/slice/registeredUsersSlice";
import currentUser from "@State/slice/currentUserSlice";
import game from "@State/slice/gameSlice";
import { initializeRegisteredPlayers } from "@Utils/registerPlayerService";
import { initializeGameInvite } from "@Utils/gameInviteService";
import { initializeGamePlay } from "@Utils/gamePlayService";

const localPersistConfig = {
  key: "game",
  storage,
};
const userPersistConfig = {
  key: "currentUser",
  storage: storageSession,
};
const gamePersistConfig = {
  key: "currentGame",
  storage: storageSession,
};

const reducers = combineReducers({
  registeredUsers: persistReducer(localPersistConfig, registeredUsers),
  currentUser: persistReducer(userPersistConfig, currentUser),
  game: persistReducer(gamePersistConfig, game),
});

const appStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          REDUX_PERSIST.FLUSH,
          REDUX_PERSIST.REHYDRATE,
          REDUX_PERSIST.PAUSE,
          REDUX_PERSIST.PERSIST,
          REDUX_PERSIST.PURGE,
          REDUX_PERSIST.REGISTER,
        ],
      },
    }),
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

initializeRegisteredPlayers(appStore);
initializeGameInvite(appStore);
initializeGamePlay(appStore);

export default appStore;
