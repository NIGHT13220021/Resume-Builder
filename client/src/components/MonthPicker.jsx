import React from "react";

const MonthPicker = ({ value = "", onChange, disabled = false }) => {
  return (
    <input
      type="month"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)} // emits YYYY-MM
      className="w-full border rounded-lg px-3 py-2"
    />
  );
};

export default MonthPicker;
