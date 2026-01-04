import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState(dummyResumeData);
  const navigate = useNavigate();

  // Create
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");

  // Upload
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [file, setFile] = useState(null);

  // Edit
  const [editResumeId, setEditResumeId] = useState(null);

  // Create Resume
  const createResume = (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    setTitle("");
    navigate("/app/builder/res123");
  };

  // Upload Resume
  const uploadResume = (e) => {
    e.preventDefault();
    if (!file) return;

    console.log("Uploaded file:", file);

    setShowUploadResume(false);
    setFile(null);
    navigate("/app/builder/res123");
  };

  // Edit Title
  const editTitle = (e) => {
    e.preventDefault();

    setAllResumes((prev) =>
      prev.map((r) =>
        r._id === editResumeId ? { ...r, title } : r
      )
    );

    setEditResumeId(null);
    setTitle("");
  };

  // Delete Resume
  const deleteResume = (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;

    setAllResumes((prev) =>
      prev.filter((r) => r._id !== resumeId)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 sm:hidden">
        Welcome, John Doe
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center
          rounded-lg gap-2 border hover:border-green-500 hover:shadow-lg"
        >
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full" />
          <p>Create Resume</p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center
          rounded-lg gap-2 border hover:border-purple-500 hover:shadow-lg"
        >
          <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full" />
          <p>Upload Existing</p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* RESUME CARDS */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];

          return (
            <button
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="group relative w-full sm:max-w-36 h-48 flex flex-col
              items-center justify-center rounded-lg gap-2 border hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: `${baseColor}40`,
              }}
            >
              <FilePenLineIcon style={{ color: baseColor }} />
              <p style={{ color: baseColor }}>{resume.title}</p>

              {/* ACTION ICONS */}
              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                  className="p-1.5 hover:bg-white/50 rounded cursor-pointer"
                />

                <PencilIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="p-1.5 hover:bg-white/50 rounded cursor-pointer"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <Modal onClose={() => setShowCreateResume(false)}>
          <form onSubmit={createResume}>
            <h2 className="text-xl font-bold mb-4">Create Resume</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Resume title"
              required
            />
            <button className="w-full bg-green-600 text-white py-2 rounded">
              Create
            </button>
          </form>
        </Modal>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <Modal onClose={() => setShowUploadResume(false)}>
          <form onSubmit={uploadResume}>
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />

            {file && (
              <p className="text-sm text-slate-600 mb-2">
                Selected: {file.name}
              </p>
            )}

            <button className="w-full bg-purple-600 text-white py-2 rounded">
              Upload
            </button>
          </form>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editResumeId && (
        <Modal onClose={() => setEditResumeId(null)}>
          <form onSubmit={editTitle}>
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />
            <button className="w-full bg-green-600 text-white py-2 rounded">
              Update
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal
const Modal = ({ children, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white border shadow-md rounded-lg w-full max-w-sm p-6"
    >
      <XIcon
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600"
      />
      {children}
    </div>
  </div>
);

export default Dashboard;
