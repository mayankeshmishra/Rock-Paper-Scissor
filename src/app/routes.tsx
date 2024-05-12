import { createBrowserRouter, Router } from "react-router-dom";

import AppLayout from "@Layouts/appLayout/AppLayout";
import Leaderboard from "@Components/Leaderboard/LeaderBoard";
import PlayerList from "@Components/PlayerList/PlayerList";
import Game from "@Components/Game/Game";

const AppRoutes = createBrowserRouter([{
    path: '/',
    element: <AppLayout />,
    children: [
        {
            path: '/',
            element: <PlayerList />
        },
        {
            path: '/players',
            element: <PlayerList />
        },
        {
            path: '/leaderboard',
            element: <Leaderboard />
        },
        {
            path: '/game',
            element: <Game />
        },
    ]
}
]);

export default AppRoutes;