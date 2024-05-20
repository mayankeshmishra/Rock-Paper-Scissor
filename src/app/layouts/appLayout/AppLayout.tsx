import React from "react";

import { Outlet } from "react-router-dom";

import Header from "@Components/Header/Header";

import "./AppLayout.scss";

const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
