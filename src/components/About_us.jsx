import React from 'react'
import { Link } from "react-router-dom";

function About_us() {
  return (
    <div className="relative w-full min-h-250 overflow-y-auto bg-linear-to-b from-[#048553] to-[#0E0019]/96 to-20%">
      <Link
        to="/"
        className="absolute left-10 top-10 group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
      >
        <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
        <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
          Back
        </span>
      </Link>
      <div className="mt-15 mb-7 flex flex-col justify-center items-center w-full">
        <p className=" text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
          Powered by Scheme Manager Pro® <br />
          ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
        </p>
      </div>
    </div>
  )
}

export default About_us
