import { User } from "./userModel";

export interface GameUser {
  user: User;
  choice?: "STONE" | "PAPER" | "SCISSOR";
}

export interface Game {
  source: GameUser;
  target: GameUser;
  winner?: User;
  status: "ON_GOING" | "FINISHED";
}

export type GAME_CHOICE = "STONE" | "PAPER" | "SCISSOR";
