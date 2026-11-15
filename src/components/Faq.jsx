import React from "react";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "What is Scheme Manager Pro?",
    answer:
      "Scheme Manager Pro, also known as MP Stokvel Manager, is a digital platform for managing the finances, membership, and administration of stokvels, informal savings schemes, and social clubs.",
  },
  {
    question: "Who can use the platform?",
    answer:
      "It is designed for savings groups, stokvels, and social clubs, and can help the people responsible for managing those groups keep their records organized.",
  },
  {
    question: "Can I keep track of member contributions?",
    answer:
      "Yes. The platform helps you record and track contributions so your group can keep a clear view of its finances.",
  },
  {
    question: "Can I see which members are behind on contributions?",
    answer:
      "Scheme Manager Pro helps identify members who may be at risk of falling into arrears, making it easier to follow up and address missed contributions.",
  },
  {
    question: "Can I record group expenses?",
    answer:
      "Yes. You can manage and track scheme expenses alongside contributions to maintain a clearer picture of group funds.",
  },
  {
    question: "How does the platform help keep records transparent?",
    answer:
      "It maintains a verifiable audit trail of transactions, helping your group review its financial activity and understand what has been recorded.",
  },
  {
    question: "Can it help manage our members?",
    answer:
      "Yes. Membership management is one of the platform's core features, helping keep your scheme's member information organized.",
  },
  {
    question: "Is Scheme Manager Pro only for stokvels?",
    answer:
      "No. It is also designed for informal savings schemes and social clubs that need help managing contributions, expenses, membership, and records.",
  },
  {
    question: "Does the platform replace our group's decisions?",
    answer:
      "No. It is a management and record-keeping tool. Your group remains responsible for its own rules, financial decisions, and follow-up with members.",
  },
  {
    question: "What can our group use it for day to day?",
    answer:
      "You can use it to organize membership, track contributions and expenses, spot possible arrears, and keep a verifiable record of transactions.",
  },
];

function Faq() {
  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-[#048553] to-[#0E0019]/96 to-20% px-5 py-8 sm:px-10">
      <Link to="/" className="group inline-flex items-center gap-1 text-white">
        <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
        <span className="font-['Rajdhani'] text-[16px] leading-5">Back</span>
      </Link>
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 mt-10 text-center text-white">
          <h1 className="font-['Rajdhani'] text-4xl font-semibold sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-['Rajdhani'] text-lg text-white/85">
            Quick answers about managing your stokvel, savings scheme, or social
            club.
          </p>
        </header>

        <section aria-label="Frequently asked questions" className="space-y-3">
          {questions.map(({ question, answer }, index) => (
            <details
              key={question}
              className="group rounded-xl bg-white px-5 py-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-['Rajdhani'] text-lg font-semibold text-slate-800 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <span className="flex">
                  <span className="mr-3 text-[#048553]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {question}
                </span>
                <i
                  className="fa-solid fa-plus shrink-0 text-sm text-[#048553] transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 border-t border-slate-100 pt-3 font-['Rajdhani'] text-base leading-relaxed text-slate-600">
                {answer}
              </p>
            </details>
          ))}
        </section>

        <div className="mt-15 mb-7 flex flex-col justify-center items-center w-full">
        <p className=" text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
          Powered by Scheme Manager Pro® <br />
          ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
        </p>
      </div>
      </div>

      
    </div>
  );
}

export default Faq;
