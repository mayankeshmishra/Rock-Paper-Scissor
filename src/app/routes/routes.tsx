import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@Layouts/appLayout/AppLayout";
import Leaderboard from "@Components/Leaderboard/LeaderBoard";
import PlayerList from "@Components/PlayerList/PlayerList";
import Game from "@Components/Game/Game";
import RegisterPlayer from "@Components/RegisterPlayer/RegisterPlayer";
import ProtectedRoute from "@Routes//ProtectedRoute";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPlayer />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <PlayerList />,
          },
          {
            path: "/leaderboard",
            element: <Leaderboard />,
          },
          {
            path: "/game",
            element: <Game />,
          },
        ],
      },
    ],
  },
]);

export default AppRoutes;
