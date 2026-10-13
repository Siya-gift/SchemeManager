import React from "react";
import signinSvgBtn from "../images/ai-button.svg";
import "../App.css";

function PrimaryBtn({ btnGuide}) {
    
  const buttonText = btnGuide;

  return (
    <button className="relative px-8 h-20 w-full md:h-20 text-white text-[13px] font-semibold overflow-hidden rounded-lg group transition-all duration-200 hover:scale-y-90 cursor-pointer focus:scale-85 flex items-center justify-center">
      {/* Background image remains locked to the container dimensions */}
      <img
        src={signinSvgBtn}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
        {/* Content wrapper: centered flex layout prevents any height shifting */}
      <span className="relative z-10 flex items-center justify-center whitespace-nowrap h-full">
        {buttonText}
      </span>
    </button>
  );
}

export default PrimaryBtn;
