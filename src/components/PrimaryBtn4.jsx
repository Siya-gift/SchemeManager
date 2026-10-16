import React from "react";
import getP from "../images/getP.svg";
import gArrow from "../images/gArrow.svg";
import "../App.css";

function PrimaryBtn({ btnGetPlan }) {
  const buttonText = btnGetPlan;

  return (
    <button className="relative px-4 h-20 w-[120%] md:h-18 text-white text-[13px] font-semibold overflow-hidden rounded-lg group transition-all duration-200 hover:scale-y-90 cursor-pointer focus:scale-85 flex  z-200 items-center justify-center">
      {/* Background image remains locked to the container dimensions */}
      <img
        src={getP}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      {/* Content wrapper: centered flex layout prevents any height shifting */}
      <span className="relative z-10 flex items-center justify-center whitespace-nowrap h-full">
        {buttonText}
        <img
          src={gArrow}
          alt=""
          className="w-4 h-2 object-contain shrink-0 align-middle"
        />
      </span>
    </button>
  );
}

export default PrimaryBtn;
