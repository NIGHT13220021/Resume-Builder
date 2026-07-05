const MeridianTemplate = ({ data, accentColor = "#B8862E" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const initials = (data.personal_info?.full_name || "Your Name")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <div className="max-w-5xl mx-auto bg-white text-[#3F4753] font-sans grid grid-cols-1 md:grid-cols-[240px_1fr]">

            {/* Sidebar */}
            <aside className="bg-[#F7F6F3] px-8 py-10 border-r border-[#E4E1D8]">
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-6"
                    style={{ backgroundColor: accentColor }}
                >
                    {initials}
                </div>

                <h1 className="text-2xl font-serif leading-tight text-[#1B2430] mb-1">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="h-px w-10 my-4" style={{ backgroundColor: accentColor }} />

                <div className="space-y-2 text-[13px] text-[#5B6473] break-words">
                    {data.personal_info?.email && <div>{data.personal_info.email}</div>}
                    {data.personal_info?.phone && <div>{data.personal_info.phone}</div>}
                    {data.personal_info?.location && <div>{data.personal_info.location}</div>}
                    {data.personal_info?.linkedin && <div className="break-all">{data.personal_info.linkedin}</div>}
                    {data.personal_info?.website && <div className="break-all">{data.personal_info.website}</div>}
                </div>

                {/* Education in sidebar */}
                {data.education && data.education.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#8B93A1] mb-4">
                            Education
                        </h2>
                        <div className="space-y-5">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <p className="text-sm font-semibold text-[#1B2430] leading-snug">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </p>
                                    <p className="text-[13px] text-[#5B6473]">{edu.institution}</p>
                                    <p className="text-[12px] font-mono text-[#8B93A1] mt-0.5">
                                        {formatDate(edu.graduation_date)}
                                    </p>
                                    {edu.gpa && (
                                        <p className="text-[12px] text-[#8B93A1]">GPA {edu.gpa}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills in sidebar */}
                {data.skills && data.skills.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#8B93A1] mb-4">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-[12px] px-2.5 py-1 rounded-full border"
                                    style={{ borderColor: `${accentColor}55`, color: "#1B2430" }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main column */}
            <main className="px-10 py-10">

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-10">
                        <h2 className="text-[11px] uppercase tracking-[0.15em] font-mono mb-3" style={{ color: accentColor }}>
                            Profile
                        </h2>
                        <p className="text-[15px] leading-relaxed text-[#3F4753]">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience — timeline rail is the signature element */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-[11px] uppercase tracking-[0.15em] font-mono mb-6" style={{ color: accentColor }}>
                            Experience
                        </h2>

                        <div className="relative pl-6">
                            {/* vertical rail */}
                            <div
                                className="absolute left-[5px] top-1 bottom-1 w-px"
                                style={{ backgroundColor: "#E4E1D8" }}
                            />

                            <div className="space-y-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative">
                                        {/* node */}
                                        <div
                                            className="absolute -left-6 top-1.5 w-[11px] h-[11px] rounded-full border-2 bg-white"
                                            style={{ borderColor: accentColor }}
                                        />
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                            <h3 className="text-[16px] font-semibold text-[#1B2430]">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[12px] font-mono text-[#8B93A1] whitespace-nowrap">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-[14px] font-medium mb-1.5" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <div className="text-[14px] leading-relaxed text-[#3F4753] whitespace-pre-line">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-[11px] uppercase tracking-[0.15em] font-mono mb-6" style={{ color: accentColor }}>
                            Projects
                        </h2>

                        <div className="space-y-5">
                            {data.project.map((proj, index) => (
                                <div key={index}>
                                    <h3 className="text-[15px] font-semibold text-[#1B2430] mb-1">
                                        {proj.name}
                                    </h3>
                                    <p className="text-[14px] leading-relaxed text-[#3F4753]">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default MeridianTemplate;
