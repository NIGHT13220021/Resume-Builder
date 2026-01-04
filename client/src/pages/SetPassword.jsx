import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ API call (JWT auto-attached by apiRequest)
      await apiRequest("/api/auth/set-password", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      // ✅ Update local user so guards allow access
      const storedUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          hasPassword: true,
          provider: "LOCAL",
        })
      );

      // ✅ IMMEDIATE REDIRECT
      navigate("/app", { replace: true });

    } catch (err) {
      setError(err?.error || "Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">
          Set Your Password
        </h2>

        {error && (
          <p className="mt-4 text-center text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="flex items-center border rounded-full px-5 h-12">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="New password"
              className="flex-1 ml-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-green-500 text-white"
          >
            {loading ? "Saving..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
