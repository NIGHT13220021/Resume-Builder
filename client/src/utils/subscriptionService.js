import { apiRequest } from "./api";

// ✅ Call backend after payment success
export const confirmSubscription = async (plan, paymentId) => {
  return apiRequest("/api/subscription/confirm", {
    method: "POST",
    body: JSON.stringify({
      plan,
      paymentId,
    }),
  });
};

// ✅ Get active subscription from backend
export const getActiveSubscription = async () => {
  return apiRequest("/api/subscription/current");
};
