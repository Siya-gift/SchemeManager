import React from "react";
import { Link } from "react-router-dom";

function Terms_and_Conditions() {
  return (
    <main className="realative min-h-screen bg-linear-to-b from-[#048553] to-[#0E0019]/96 to-20% px-4 py-10 text-white sm:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl sm:p-10">
        <header className="mb-8 border-b border-white/15 pb-6">
          <Link
            to="/"
            className="md:absolute mb-5 left-10 top-10 group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
          >
            <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
            <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
              Back
            </span>
          </Link>
          <h1 className="text-3xl font-bold sm:text-4xl">Terms & Conditions</h1>
          <p className="mt-3 text-sm text-white/65">
            Scheme Manager Pro (Pty) Ltd
            <br />
            Last updated: 14 November 2026
          </p>
        </header>

        <div className="space-y-8 leading-7 text-white/85">
          <section>
            <p>
              This policy explains how Scheme Manager Pro (&quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;) handles information when you
              use the Scheme Manager website and application at{" "}
              <a
                className="text-emerald-300 underline"
                href="https://scheme-manager.com"
              >
                scheme-manager.com
              </a>
              . We aim to handle personal information in accordance with
              applicable privacy laws, including South Africa&apos;s Protection
              of Personal Information Act (POPIA).
            </p>
          </section>
        </div>
      </article>

      <div className="mt-15 mb-7 flex flex-col justify-center items-center w-full">
        <p className=" text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
          Powered by Scheme Manager Pro® <br />
          ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
        </p>
      </div>
    </main>
  );
}

export default Terms_and_Conditions;
