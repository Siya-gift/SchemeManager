import React, { useState } from "react";
import { Link } from "react-router-dom";

const helpTree = {
  id: "root",
  title: "Help Center",
  children: [
    {
      id: "get-started",
      title: "Get Started",
      children: [
        {
          id: "account-setup",
          title: "Account Setup",
          content: "Learn how to create your profile, verify your email, and configure initial workspace settings.",
        },
        {
          id: "dashboard-overview",
          title: "Dashboard Overview",
          content: "Explore the main navigation, quick actions, and scheme performance metrics.",
        },
      ],
    },
    {
      id: "scheme-management",
      title: "Scheme Management",
      children: [
        {
          id: "adding-members",
          title: "Adding Members",
          content: "Step-by-step instructions on importing or manually adding scheme members.",
        },
        {
          id: "billing-invoices",
          title: "Billing & Invoices",
          content: "Manage payment methods, view monthly statements, and download tax invoices.",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: "Common issues, password resets, and how to contact Scheme Manager Pro support.",
    },
  ],
};

function Help() {
  const [path, setPath] = useState([helpTree]);

  const currentNode = path[path.length - 1];

  const handleSelectNode = (node) => {
    setPath((prev) => [...prev, node]);
  };

  const handleBreadcrumbClick = (index) => {
    setPath((prev) => prev.slice(0, index + 1));
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-y-auto bg-linear-to-b from-[#048553] to-[#0E0019]/96 to-20%">
      {/* Top Back Link */}
      <Link
        to="/"
        className="absolute left-10 top-10 group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
      >
        <span className="transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1">
          <i className="fa-solid fa-chevron-left text-[14px]" />
        </span>
        <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
          Back
        </span>
      </Link>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto px-6 pt-28 pb-12 text-white font-['Rajdhani']">
        {/* Tree Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-lg mb-8">
          {path.map((node, index) => {
            const isLast = index === path.length - 1;
            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  disabled={isLast}
                  className={`transition-colors ${
                    isLast
                      ? "text-[#048553] font-semibold cursor-default"
                      : "text-white/75 hover:text-white cursor-pointer"
                  }`}
                >
                  {node.title}
                </button>
                {!isLast && (
                  <span className="text-xs text-white/40 inline-flex items-center">
                    <i className="fa-solid fa-chevron-right" />
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Current Node View */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold mb-4">{currentNode.title}</h1>

          {/* Render child branches if they exist */}
          {currentNode.children && (
            <div className="grid gap-3 sm:grid-cols-2">
              {currentNode.children.map((child) => (
                <button
                  key={`${currentNode.id}-${child.id}`}
                  onClick={() => handleSelectNode(child)}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group cursor-pointer"
                >
                  <span className="text-lg">{child.title}</span>
                  <span className="text-sm text-[#048553] transition-transform group-hover:translate-x-1 inline-flex items-center">
                    <i className="fa-solid fa-chevron-right" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Render leaf article content if available */}
          {currentNode.content && (
            <p className="text-white/80 text-base leading-relaxed">
              {currentNode.content}
            </p>
          )}
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

export default Help;