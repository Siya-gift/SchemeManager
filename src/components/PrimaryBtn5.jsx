import React from "react";
import signupBT from "../images/signupBT.svg";
// ❌ REMOVED: import loading from "./Signup.jsx"; (This was causing a conflict)
import "../App.css";

function PrimaryBtn5({ type, onClick, btnSignup, loading }) {
  return (
    <button
      className="relative text-white h-20 md:h-21 text-[11px] font-semibold px-12 py-5 overflow-hidden rounded-lg group transition-all duration-200 hover:scale-y-90 cursor-pointer focus:scale-85"
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      <img
        src={signupBT}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      
      <span className="relative z-10 no-word-break flex items-center justify-center w-full h-full min-w-15">
        {loading ? (
          <div className="dot-loader">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ) : (
          btnSignup
        )}
      </span>
    </button>
  );
}

export default PrimaryBtn5;
