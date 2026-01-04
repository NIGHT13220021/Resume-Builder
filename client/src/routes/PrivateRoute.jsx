import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const PrivateRoute = () => {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // 🔐 ask backend if token is valid
        await apiRequest("/api/auth/me");
        setAllowed(true);
      } catch {
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    };

    verifyAuth();
  }, []);

  if (checking) return null; // or loader

  return allowed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
