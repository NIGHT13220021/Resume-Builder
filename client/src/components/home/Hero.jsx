import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* ================= NAVBAR ================= */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <Link to="/" className="text-xl font-semibold text-green-600">
          ResumeBuilder
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-800">
          <a href="#" className="hover:text-green-600 transition">Home</a>
          <a href="#features" className="hover:text-green-600 transition">Features</a>
          <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
          <a href="#contact" className="hover:text-green-600 transition">Contact</a>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex gap-2">
          <Link
            to="/login?state=register"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 transition rounded-full text-white"
          >
            Get started
          </Link>

          <Link
            to="/login?state=login"
            className="px-6 py-2 border hover:bg-slate-50 transition rounded-full text-slate-700"
          >
            Login
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center gap-6 md:hidden transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to="/" className="text-white" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link
          to="/login?state=register"
          className="text-white"
          onClick={() => setMenuOpen(false)}
        >
          Get started
        </Link>

        <Link
          to="/login?state=login"
          className="text-white"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>

        <button
          onClick={() => setMenuOpen(false)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Close
        </button>
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 md:px-16 lg:px-24 xl:px-40 text-black">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-28 left-1/4 -z-10 size-96 bg-green-300 blur-[120px] opacity-30"></div>

        {/* SOCIAL PROOF */}
        <p className="mt-24 text-sm text-gray-600">
          Used by 10,000+ job seekers worldwide
        </p>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl mt-6 leading-tight">
          Land your dream job with{" "}
          <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
            AI-powered
          </span>{" "}
          resumes.
        </h1>

        {/* SUBTEXT */}
        <p className="max-w-md text-base my-7 text-gray-600">
          Create, edit, and download professional resumes that recruiters love —
          powered by smart AI assistance.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex items-center gap-4">
          <Link
            to="/login?state=register"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 flex items-center transition"
          >
            Get started →
          </Link>

          <button className="border border-slate-400 hover:bg-green-50 transition rounded-full px-7 h-12 text-slate-700">
            Try demo
          </button>
        </div>

        {/* TRUST TEXT (NO ICONS) */}
        <p className="mt-14 text-sm text-gray-500 max-w-xl">
          Trusted by students, professionals, and career switchers to build
          clean, modern, recruiter-ready resumes.
        </p>
      </div>
    </div>
  );
};

export default Hero;
