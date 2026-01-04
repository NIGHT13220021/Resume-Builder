import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { apiRequest } from "../utils/api";
import { loginUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ================= EMAIL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      loginUser(data.token, data.user);
      navigate("/app", { replace: true });

    } catch (err) {
      setMessage(err?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credential:", credentialResponse);

      const data = await apiRequest("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      console.log("Backend response:", data);

      loginUser(data.token, data.user);

      if (data.user.provider === "GOOGLE" && !data.user.hasPassword) {
        navigate("/set-password", { replace: true });
      } else {
        navigate("/app", { replace: true });
      }

    } catch (err) {
      console.error("Google login error:", err);
      setMessage("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl px-8 py-10">

        <h1 className="text-3xl font-bold text-center">Welcome Back 👋</h1>
        <p className="text-center text-gray-500 mt-1">
          Login to continue
        </p>

        {message && (
          <div className="mt-4 text-sm text-center text-red-600">
            {message}
          </div>
        )}

        {/* GOOGLE LOGIN */}
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setMessage("Google login failed")}
          />
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 rounded-full px-11 border outline-none"
              placeholder="Email"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 rounded-full px-11 border outline-none"
              placeholder="Password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full h-12 rounded-full bg-emerald-600 text-white"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
