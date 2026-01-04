// src/services/api.js (or wherever this file is)

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(API_BASE + url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    body: options.body,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  // 🔴 HANDLE ERRORS
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    if (res.status === 403 && data?.error === "SUBSCRIPTION_REQUIRED") {
      window.location.href = "/subscribe";
      return;
    }

    throw data || { error: `Request failed (${res.status})` };
  }

  return data;
};

export const loginUser = (token, user) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
