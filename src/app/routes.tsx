import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@Layouts/appLayout/AppLayout";
import Leaderboard from "@Components/Leaderboard/LeaderBoard";
import PlayerList from "@Components/PlayerList/PlayerList";
import Game from "@Components/Game/Game";
import RegisterPlayer from "@Components/RegisterPlayer/RegisterPlayer";

const AppRoutes = createBrowserRouter([{
    path: '/',
    element: <AppLayout />,
    children: [
        {
            path: '/',
            element: <RegisterPlayer />
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