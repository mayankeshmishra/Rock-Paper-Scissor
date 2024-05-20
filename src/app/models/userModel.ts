export interface User {
  name: string;
  isPlaying: boolean;
  waitingQueue: Array<any>;
  score: number;
}

export interface PlayerMessage {
  name: string;
  status: "JOINED" | "LEFT";
}

export interface InviteMessage {
  targetUser: User;
  sourceUser: User;
  isInvitePending: boolean;
  isInviteAccepted: boolean;
}
