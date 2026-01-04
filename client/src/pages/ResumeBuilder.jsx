import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { dummyResumeData } from "../assets/assets";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  Sparkles,
  User,
  GraduationCap,
  Share2,
  Eye,
  EyeOff,
  Download,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";

const EMPTY_RESUME = {
  _id: "",
  title: "",
  personal_info: {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    linkedin: "",
    website: "",
    image: "", // ✅ must be string (URL / base64)
    remove_background: false,
  },
  professional_summary: "",
  experience: [],
  education: [],
  project: [],
  skills: [],
  template: "classic",
  accent_color: "#3B82F6",
  public: false,
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  const [resumeData, setResumeData] = useState(EMPTY_RESUME);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  /* ================= LOAD RESUME ONCE ================= */
  useEffect(() => {
    if (initializedRef.current || !resumeId) return;

    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (!resume) return;

    setResumeData({
      ...EMPTY_RESUME,
      ...resume,
      personal_info: {
        ...EMPTY_RESUME.personal_info,
        ...resume.personal_info,
        image: resume.personal_info?.image || "", // ✅ safe
      },
      experience: resume.experience || [],
      education: resume.education || [],
      project: resume.project || [],
      skills: resume.skills || [],
    });

    document.title = resume.title || "Resume Builder";
    initializedRef.current = true;
  }, [resumeId]);

  /* ================= SAVE & NEXT ================= */
  const handleSaveAndNext = () => {
    setActiveSectionIndex((i) => Math.min(i + 1, sections.length - 1));
  };

  /* ================= PUBLIC / PRIVATE ================= */
  const togglePublic = () => {
    setResumeData((p) => ({ ...p, public: !p.public }));
  };

  /* ================= SHARE ================= */
  const handleShare = async () => {
    if (!resumeData.public) return;

    const url = `${window.location.origin}/view/${resumeId}`;

    if (navigator.share) {
      await navigator.share({
        title: resumeData.title || "My Resume",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  };

  /* ================= DOWNLOAD ================= */
 /* ================= DOWNLOAD ================= */
const handleDownload = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    // 1️⃣ Not logged in → login
    if (!token || !user) {
      navigate("/login");
      return;
    }

    // 2️⃣ Ask backend if user is subscribed
    const subscription = await apiRequest("/api/subscription/me");

    // Not subscribed → subscribe page
    if (!subscription || subscription.status !== "ACTIVE") {
      navigate("/subscribe");
      return;
    }

    // 3️⃣ Subscribed → allow printable download
    window.print();

  } catch (err) {
    console.error("Download error:", err);

    // Explicit subscription error from backend
    if (err?.error === "SUBSCRIPTION_REQUIRED") {
      navigate("/subscribe");
      return;
    }

    alert("Download failed");
  }
};


  return (
    <div>
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="bg-white border rounded-lg p-6 pt-1">

              {/* TOP BAR */}
              <div className="flex justify-between items-center mb-6 border-b py-3">
                <div className="flex gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((p) => ({ ...p, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(accent_color) =>
                      setResumeData((p) => ({ ...p, accent_color }))
                    }
                  />
                </div>

                <div className="flex gap-2">
                  {activeSectionIndex > 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((i) => i - 1)
                      }
                      className="text-sm flex items-center gap-1 px-2 py-1 border rounded"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={handleSaveAndNext}
                    className="text-sm flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save & Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* FORMS */}
              {sections[activeSectionIndex].id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(v) =>
                    setResumeData((p) => ({
                      ...p,
                      personal_info: {
                        ...p.personal_info,
                        ...v,
                        image:
                          v.image instanceof File
                            ? URL.createObjectURL(v.image) // ✅ FIX IMAGE
                            : v.image ?? p.personal_info.image,
                      },
                    }))
                  }
                />
              )}

              {sections[activeSectionIndex].id === "summary" && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={(v) =>
                    setResumeData((p) => ({ ...p, professional_summary: v }))
                  }
                />
              )}

              {sections[activeSectionIndex].id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(v) =>
                    setResumeData((p) => ({ ...p, experience: v }))
                  }
                />
              )}

              {sections[activeSectionIndex].id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(v) =>
                    setResumeData((p) => ({ ...p, education: v }))
                  }
                />
              )}

              {sections[activeSectionIndex].id === "projects" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(v) =>
                    setResumeData((p) => ({ ...p, project: v }))
                  }
                />
              )}

              {sections[activeSectionIndex].id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(v) =>
                    setResumeData((p) => ({ ...p, skills: v }))
                  }
                />
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div className="sticky top-4 flex justify-end gap-2 mb-4 no-print">

              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded"
                >
                  <Share2 size={16} />
                  Share
                </button>
              )}

              <button
                onClick={togglePublic}
                className={`flex items-center gap-1 px-3 py-2 rounded ${
                  resumeData.public
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {resumeData.public ? <Eye size={16} /> : <EyeOff size={16} />}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded"
              >
                <Download size={16} />
                Download
              </button>
            </div>

            <ResumePreview
              key={resumeData.personal_info.image} // ✅ force re-render image
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumeBuilder;
