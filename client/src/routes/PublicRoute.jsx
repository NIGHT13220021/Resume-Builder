import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("authToken");

  // If logged in → go to app
  if (token) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;