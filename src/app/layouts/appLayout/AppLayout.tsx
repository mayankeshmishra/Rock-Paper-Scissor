import Header from "@Components/Header/Header";

import './AppLayout.scss'
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className='app-layout'>
            <Header />
            <Outlet />
        </div>
    );
}

export default AppLayout;