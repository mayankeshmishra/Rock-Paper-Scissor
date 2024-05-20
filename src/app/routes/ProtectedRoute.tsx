import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { AppState } from "@State/store";

const ProtectedRoute: React.FC = () => {
  const currentUser = useSelector((state: AppState) => state.currentUser);
  return currentUser.name ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
