import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Linkedin,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data = {},
  onChange,
  removeBackground = false,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text" },
    { key: "email", label: "Email", icon: Mail, type: "email" },
    { key: "phone", label: "Phone", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
    { key: "website", label: "Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Personal Information</h3>

      {/* IMAGE + TOGGLE */}
      <div className="flex items-center gap-6">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-300"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border flex items-center justify-center text-gray-400">
              <User />
            </div>
          )}
          <input
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={(e) =>
              handleChange("image", e.target.files[0])
            }
          />
        </label>

        {typeof data.image === "object" && (
          <div className="flex items-center gap-3">
            <span className="text-sm">Remove Background</span>

            <button
              type="button"
              onClick={() => setRemoveBackground((prev) => !prev)}
              className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
                removeBackground ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow
                transition-transform duration-300 ${
                  removeBackground ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* INPUTS */}
      {fields.map((f) => {
        const Icon = f.icon;
        return (
          <div key={f.key}>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Icon size={14} /> {f.label}
            </label>
            <input
              type={f.type}
              value={data[f.key] || ""}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
