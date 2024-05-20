import { Store } from "@reduxjs/toolkit";
import Snackbar from "awesome-snackbar";

import { AppState } from "@State/store";
import {
  addGameToWaitingQueue,
  updatePlayingStatus,
} from "@State/slice/currentUserSlice";
import { setGame } from "@State/slice/gameSlice";
import AppRoutes from "@Routes/routes";
import { User } from "@Models/userModel";

export const initializeGameInvite = async (store: Store) => {
  const gameInviteChannel = new BroadcastChannel("game-invite");
  gameInviteChannel.onmessage = async (message) => {
    const state: AppState = store.getState();
    const currentUser = state.currentUser;
    if (
      message.data.targetUser.name === currentUser.name &&
      message.data.isInvitePending
    ) {
      if (currentUser?.isPlaying && !message.data.isReplayInvite) {
        // Push invite to waiting queue
        store.dispatch(addGameToWaitingQueue(message.data));
      } else {
        // Show invite snackbar
        new Snackbar(
          `User ${message.data.sourceUser.name} has ${
            message.data.isReplayInvite ? "re-invited" : "invited"
          } you for a game`,
          {
            theme: "light",
            position: "bottom-right",
            actionText: "Play",
            onAction: async () => {
              // Send Invite accepted message
              gameInviteChannel.postMessage({
                ...message.data,
                isInviteAccepted: true,
              });
              // Navigate to game and set isPlaying to true
              store.dispatch(updatePlayingStatus(true));
              store.dispatch(
                setGame({
                  source: { user: message.data.sourceUser, choice: undefined },
                  target: { user: message.data.targetUser, choice: undefined },
                  status: "ON_GOING",
                })
              );
              AppRoutes.navigate("/game");
            },
            afterHide: () => {
              if (!store.getState().currentUser.isPlaying) {
                // Send Invite rejected message
                gameInviteChannel.postMessage({
                  ...message.data,
                  isInvitePending: false,
                  isInviteAccepted: false,
                });
              }
            },
          }
        );
      }
    } else if (message.data.sourceUser.name === currentUser.name) {
      if (message.data.isInviteAccepted) {
        // Navigate to game and set isPlaying to true
        store.dispatch(updatePlayingStatus(true));
        store.dispatch(
          setGame({
            source: { user: message.data.sourceUser, choice: undefined },
            target: { user: message.data.targetUser, choice: undefined },
            status: "ON_GOING",
          })
        );
        AppRoutes.navigate("/game");
      } else if (!message.data.isInvitePending) {
        // Show Invite Declined Snackbar
        new Snackbar(
          `User ${message.data.targetUser} has declined your invite`,
          {
            theme: "light",
            position: "bottom-right",
          }
        );
      }
    }
  };
};

export const inviteUser = (
  source: User,
  target: User,
  isReplayInvite: boolean
) => {
  const gameInviteChannel = new BroadcastChannel("game-invite");
  gameInviteChannel?.postMessage({
    targetUser: target,
    sourceUser: source,
    isInvitePending: true,
    isInviteAccepted: false,
    isReplayInvite: isReplayInvite,
  });
};
