import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

const SkillsForm = ({ data = [], onChange }) => {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const value = skill.trim();
    if (!value) return;
    if (data.includes(value)) return;

    onChange([...data, value]);
    setSkill("");
  };

  const removeSkill = (value) => {
    onChange(data.filter((s) => s !== value));
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold">Skills</h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills
        </p>
      </div>

      {/* INPUT + ADD BUTTON */}
      <div className="flex gap-2">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="Enter a skill (e.g. JavaScript, Project Management)"
          className="flex-1 border px-3 py-2 rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-1 px-4 py-2 rounded-lg
          bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10
        text-gray-400 border rounded-lg">
          <Sparkles size={28} className="mb-2" />
          <p className="text-sm font-medium">No skills added yet.</p>
          <p className="text-xs">
            Add your technical and soft skills above.
          </p>
        </div>
      ) : (
        /* SKILL CHIPS */
        <div className="flex flex-wrap gap-2">
          {data.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-3 py-1
              bg-gray-100 rounded-full text-sm"
            >
              <span className="break-all">{s}</span>
              <button
                onClick={() => removeSkill(s)}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TIP BOX */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        <p className="font-medium text-blue-700 mb-1">Tip:</p>
        <p className="text-blue-600">
          Add 8–12 relevant skills. Include both technical skills
          (programming languages, tools) and soft skills
          (leadership, communication).
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
