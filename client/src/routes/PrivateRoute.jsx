import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const PrivateRoute = () => {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");

      // 🔐 If no token, block immediately
      if (!token) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      try {
        // 🔐 Validate token with backend
        await apiRequest("/api/auth/me");
        setAllowed(true);
      } catch (err) {
        console.error("Auth verification failed:", err);
        setAllowed(false);
        localStorage.clear();
      } finally {
        setChecking(false);
      }
    };

    verifyAuth();
  }, []);

  // Optional: loading state
  if (checking) {
    return null; // or spinner
  }

  return allowed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
