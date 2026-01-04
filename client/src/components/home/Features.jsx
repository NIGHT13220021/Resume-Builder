import React, { useState } from "react";
import Title from "./Title";
import { Zap } from "lucide-react";


const Features = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-12"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-10">

        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
        <Zap  width={14}/>
          <span>Simple Process</span>
        </div>

        <Title
          title="Build your resume"
          description="Our streamlined process helps you create a professional resume in minutes with intelligent tools."
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Features"
        />

        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature Card */}
          <div className="flex items-center justify-center gap-6 max-w-md">
            <div
              className={`p-6 flex gap-4 rounded-xl transition-colors border ${
                !isHover
                  ? "border-violet-300 bg-violet-100"
                  : "border-transparent hover:bg-violet-100 hover:border-violet-300"
              }`}
            >
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Real-Time Analytics
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Get instant insights into your finances with live dashboards.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Card */}
          <div className="flex items-center justify-center gap-6 max-w-md mt-4">
            <div className="p-6 flex gap-4 rounded-xl transition-colors border border-transparent hover:bg-green-100 hover:border-green-300">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Bank-Grade Security
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  End-to-end encryption, 2FA, GDPR compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Card */}
          <div className="flex items-center justify-center gap-6 max-w-md mt-4">
            <div className="p-6 flex gap-4 rounded-xl transition-colors border border-transparent hover:bg-orange-100 hover:border-orange-300">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Customizable Reports
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Export professional, audit-ready reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
