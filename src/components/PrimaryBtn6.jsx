import React from "react";
import checkout_btn from "../images/checkout_btn.svg";

import "../App.css";

function PrimaryBtn6({ type, onClick, btnCheckout, loading }) {
  return (
    <button
      className="relative text-white h-25  md:h-21 text-[13px] font-semibold px-15 py-6 overflow-hidden rounded-lg group transition-all duration-200 hover:scale-y-90 cursor-pointer focus:scale-85"
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      <img
        src={checkout_btn}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-10"
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
          btnCheckout
        )}
      </span>
    </button>
  );
}

export default PrimaryBtn6;
