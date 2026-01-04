import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeftIcon, Loader } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const resume = dummyResumeData.find(
      (r) => r._id === resumeId
    );

    setResumeData(resume || null);
    setIsLoading(false);
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-4xl text-slate-400 font-medium">
          Resume not found
        </p>
        <Link
          to="/app"
          className="mt-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  );
};

export default Preview;
