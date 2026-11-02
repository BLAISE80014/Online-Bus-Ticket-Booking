import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();

  let currentUser = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    const authToken = localStorage.getItem("authToken");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    currentUser =
      authToken &&
      parsedUser &&
      typeof parsedUser === "object" &&
      ["passenger", "admin"].includes(parsedUser.role)
        ? parsedUser
        : null;
  } catch {
    currentUser = null;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
