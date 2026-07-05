import { Sparkles } from "lucide-react";
import React, { useState } from "react";

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAIEnhance = async () => {
    setError("");

    if (!data || data.trim().length < 10) {
      setError("Please write at least a few lines before enhancing.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/ai/enhance/summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // keeps auth/JWT same
          body: JSON.stringify({
            summary: data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI enhancement failed");
      }

      const result = await response.json();

      if (result?.enhancedSummary) {
        onChange(result.enhancedSummary);
      }
    } catch (err) {
      console.error(err);
      setError("AI enhancement failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          type="button"
          onClick={handleAIEnhance}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1 text-sm
            bg-purple-100 text-purple-700 rounded
            hover:bg-purple-200 transition-colors
            disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          {loading ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      {/* Textarea */}
      <div className="mt-6">
        <textarea
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300
            rounded-lg focus:ring focus:ring-blue-500
            focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />

        {error && (
          <p className="text-xs text-red-500 text-center mt-2">
            {error}
          </p>
        )}

        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center mt-2">
          Tips: Keep it concise (3–4 lines) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
