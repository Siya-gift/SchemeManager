import React from "react";
import signupBT from "../images/signupBT.svg";
import "../App.css";

function PrimaryBtn2({btnSignup}) {
  return (
    <button className="relative text-white h-20 md:h-auto text-[11px] font-semibold px-12 py-5 overflow-hidden rounded-lg group transition-all duration-200 hover:scale-y-90 cursor-pointer focus:scale-85">
      <img
        src={signupBT}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <span className="relative z-10 no-word-break">
        {btnSignup}
      </span>
    </button>
  );
}

export default PrimaryBtn2;
