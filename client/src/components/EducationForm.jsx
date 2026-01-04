import React from "react";
import { GraduationCap, Trash2, Plus } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {

  const update = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "", // ✅ MATCHES TEMPLATE
      },
    ]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <GraduationCap size={18} />
          Education
        </h3>

        <button
          onClick={addEducation}
          className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {data.map((edu, index) => (
        <div key={index} className="border p-4 rounded space-y-4">

          <div className="flex justify-between">
            <span>Education #{index + 1}</span>
            <Trash2
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => removeEducation(index)}
            />
          </div>

          <input
            value={edu.degree}
            placeholder="Degree"
            onChange={(e) => update(index, "degree", e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />

          <input
            value={edu.field}
            placeholder="Field of Study"
            onChange={(e) => update(index, "field", e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />

          <input
            value={edu.institution}
            placeholder="Institution"
            onChange={(e) => update(index, "institution", e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />

          {/* ✅ THIS NOW WORKS WITH TEMPLATE */}
          <input
            type="month"
            value={edu.graduation_date || ""}
            onChange={(e) =>
              update(index, "graduation_date", e.target.value)
            }
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
