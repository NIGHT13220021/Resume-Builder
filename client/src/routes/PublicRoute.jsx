import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("authToken"); // ✅ correct key
  const user = JSON.parse(localStorage.getItem("user"));

  // already logged in & completed setup
  if (token && user && (user.provider !== "GOOGLE" || user.hasPassword)) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
