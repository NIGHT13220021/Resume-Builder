import React from "react";
import { FolderIcon, Plus, Trash2 } from "lucide-react";

// 🔹 helper: normalize description safely
const normalizeDescription = (text) => {
  if (!text) return "";

  return text
    // prevent ultra-long words from breaking layout
    .replace(/(\S{40})/g, "$1 ")
    // normalize multiple spaces
    .replace(/\s+/g, " ")
    // keep line breaks readable
    .trim();
};

const ProjectForm = ({ data = [], onChange }) => {

  const addProject = () => {
    onChange([
      ...data,
      {
        name: "",
        description: "",
      },
    ]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "description"
          ? normalizeDescription(value)
          : value,
    };
    onChange(updated);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <FolderIcon className="size-5" />
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Add projects you have worked on
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No projects added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-4"
            >

              {/* TOP BAR */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  Project #{index + 1}
                </h4>
                <button onClick={() => removeProject(index)}>
                  <Trash2 className="size-4 text-red-500" />
                </button>
              </div>

              {/* PROJECT NAME */}
              <input
                value={project.name}
                placeholder="Project Name"
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                className="border px-3 py-2 rounded w-full"
              />

              {/* DESCRIPTION */}
              <textarea
                value={project.description}
                placeholder={`Describe what you built, features, and impact.
Tip: Use short sentences. Line breaks are supported.`}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                rows={4}
                className="border px-3 py-2 rounded w-full resize-y"
              />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
