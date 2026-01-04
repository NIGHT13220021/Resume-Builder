import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";

const A4_HEIGHT_PX = 1122;

const formatMonthYear = (ym) => {
  if (!ym || !/^\d{4}-\d{2}$/.test(ym)) return "";
  const [year, month] = ym.split("-");
  return new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const ResumePreview = ({ data, template, accentColor }) => {
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  const normalizedData = useMemo(
    () => ({
      ...data,
      experience: (data.experience || []).map((exp) => ({
        ...exp,
        end_date: exp.is_current ? "Present" : exp.end_date,
      })),
      education: (data.education || []).map((edu) => ({
        ...edu,
        completion_date: formatMonthYear(edu.completion_date),
      })),
    }),
    [data]
  );

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const h = contentRef.current.scrollHeight;
    const s = h > A4_HEIGHT_PX ? A4_HEIGHT_PX / h : 1;
    setScale(Number(s.toFixed(3)));
  }, [normalizedData, template]);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={normalizedData} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={normalizedData} accentColor={accentColor} />;
      case "minimal-image":
        return (
          <MinimalImageTemplate
            data={normalizedData}
            accentColor={accentColor}
          />
        );
      default:
        return <ClassicTemplate data={normalizedData} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-100 print:bg-white">
      <div
        id="resume-preview"
        style={{
          width: "210mm",
          height: "297mm",
          background: "white",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: "210mm",
          }}
        >
          <div
            ref={contentRef}
            style={{
              padding: "16mm",
              boxSizing: "border-box",
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* ✅ SAFE PRINT STYLES */}
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html, body {
            margin: 0;
            padding: 0;
            background: white;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
