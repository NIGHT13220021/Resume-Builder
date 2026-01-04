import React from "react";
import { Briefcase, Trash2, Plus, Sparkles } from "lucide-react";

/**
 * Break long unbroken words WITHOUT changing visible text.
 * Uses zero-width space so browser can wrap lines.
 */
const breakLongWords = (text) => {
  if (!text) return "";
  return text.replace(/(\S{25})/g, "$1\u200B");
};

const ExperienceForm = ({ data = [], onChange }) => {

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        is_current: false,
        description: "",
      },
    ]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "description"
          ? breakLongWords(value)
          : value,
    };
    onChange(updated);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Briefcase className="size-5" />
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your work experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No experience added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-4"
            >

              {/* TOP BAR */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  Experience #{index + 1}
                </h4>
                <button onClick={() => removeExperience(index)}>
                  <Trash2 className="size-4 text-red-500" />
                </button>
              </div>

              {/* COMPANY + POSITION */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={exp.company}
                  placeholder="Company"
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  value={exp.position}
                  placeholder="Job Title"
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />
              </div>

              {/* DATES */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="month"
                  value={exp.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  type="month"
                  value={exp.is_current ? "" : exp.end_date}
                  disabled={exp.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />
              </div>

              {/* CURRENTLY WORKING */}
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none w-40">
                <input
                  type="checkbox"
                  checked={Boolean(exp.is_current)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updated = [...data];
                    updated[index] = {
                      ...updated[index],
                      is_current: checked,
                      end_date: checked ? "" : updated[index].end_date,
                    };
                    onChange(updated);
                  }}
                  className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                />
                <span>I currently work here</span>
              </label>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Job Description
                  </label>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-xs
                    bg-purple-100 text-purple-700 rounded"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance
                  </button>
                </div>

                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full border px-3 py-2 rounded resize-y"
                  placeholder="Describe your responsibilities and achievements."
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
