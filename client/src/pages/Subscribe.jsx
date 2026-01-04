import React from "react";
import { apiRequest } from "../utils/api";

const Subscribe = () => {

  const loadRazorpay = async (amount, plan) => {
    try {
      // 🔐 Ensure user is logged in
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      // 1️⃣ Create Razorpay order from backend
      const order = await apiRequest("/api/payment/create-order", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔑 ENV ONLY
        amount: order.amount,
        currency: "INR",
        name: "Resume Builder",
        description: "Subscription Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // 🔥 CONFIRM SUBSCRIPTION WITH BACKEND (JWT REQUIRED)
            await apiRequest("/api/subscription/confirm", {
              method: "POST",
              body: JSON.stringify({
                plan,
                paymentId: response.razorpay_payment_id,
              }),
            });

            alert("Subscription activated 🎉");
            window.location.href = "/app";

          } catch (err) {
            console.error(err);
            alert(
              "Payment was successful, but subscription activation failed. Please contact support."
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Choose a Plan
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => loadRazorpay(100, "BASIC")}
            className="w-full flex justify-between items-center border rounded-xl px-5 py-4 hover:border-green-500 hover:bg-green-50 transition"
          >
            <span className="font-medium">Basic</span>
            <span className="font-semibold">₹100</span>
          </button>

          <button
            onClick={() => loadRazorpay(200, "PRO")}
            className="w-full flex justify-between items-center border rounded-xl px-5 py-4 hover:border-green-500 hover:bg-green-50 transition"
          >
            <span className="font-medium">Pro</span>
            <span className="font-semibold">₹200</span>
          </button>

          <button
            onClick={() => loadRazorpay(300, "PREMIUM")}
            className="w-full flex justify-between items-center bg-green-500 text-white rounded-xl px-5 py-4 hover:bg-green-600 transition"
          >
            <span className="font-medium">Premium</span>
            <span className="font-semibold">₹300</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
