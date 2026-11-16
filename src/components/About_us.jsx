import React from "react";
import { Link } from "react-router-dom";

const objectives = [
  {
    title: "Digital Transformation",
    description:
      "Transition scheme administrators from error-prone manual spreadsheets to an automated tracking system.",
    icon: "fa-solid fa-arrows-rotate",
  },
  {
    title: "Financial Transparency",
    description:
      "Provide centralized historical logging and detailed summaries of group finances (Collections vs. Expenses).",
    icon: "fa-solid fa-scale-balanced",
  },
  {
    title: "Risk Mitigation",
    description:
      "Automatically flag at-risk members who are falling behind on their payments.",
    icon: "fa-solid fa-shield-halved",
  },
  {
    title: "Operational Efficiency",
    description:
      "Enable quick generation of PDF reports and member statements without requiring external software.",
    icon: "fa-solid fa-file-pdf",
  },
  {
    title: "Data Portability",
    description:
      "Ensure administrators have full control of their data through localized backups and offline-first capabilities.",
    icon: "fa-solid fa-database",
  },
];

function About_us() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-y-auto bg-linear-to-b from-[#048553] to-[#0E0019]/96 to-20%">
      {/* Top Back Link */}
      <Link
        to="/"
        className="absolute left-10 top-10 group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
      >
        <span className="transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1 inline-flex items-center">
          <i className="fa-solid fa-chevron-left text-[14px]" />
        </span>
        <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
          Back
        </span>
      </Link>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-6 pt-28 pb-12 text-white font-['Rajdhani']">
        {/* Header & Overview */}
        <div className="mb-10">
          <span className="inline-block text-xs uppercase tracking-widest text-[#048553] bg-[#048553]/15 border border-[#048553]/40 px-3 py-1 rounded-full mb-3 font-semibold">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Scheme Manager Pro
          </h1>
          <p className="text-sm text-white/60 mb-6">
            Also known as <span className="text-white/90 font-medium">MP Stokvel Manager</span>
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Scheme Manager Pro is a digital platform designed to streamline the
              financial, membership, and administrative management of informal
              savings schemes, stokvels, and social clubs. The primary goal of
              the application is to provide a reliable, transparent, and
              user-friendly interface for tracking contributions, managing
              expenses, identifying members at risk of falling into arrears, and
              maintaining a verifiable audit trail of all transactions.
            </p>
          </div>
        </div>

        {/* Business Objectives */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#048553] rounded-full inline-block" />
            Business Objectives
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {objectives.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-lg bg-[#048553]/20 border border-[#048553]/40 text-[#048553] inline-flex items-center justify-center shrink-0">
                    <i className={`${item.icon} text-sm`} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-15 mb-7 flex flex-col justify-center items-center w-full">
        <p className="text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
          Powered by Scheme Manager Pro® <br />
          ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
        </p>
      </div>
    </div>
  );
}

export default About_us;