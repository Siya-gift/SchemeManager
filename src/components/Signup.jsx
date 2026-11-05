import React from "react";
import signbg from "../images/signbg.svg";
import logo from "../images/logo_h.png";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function Signup() {
  return (
    <div className="bg-[#1E1E1E]">
      <div className="relative flex justify-center items-center h-screen w-screen bg-[conic-gradient(from_90deg_at_50%_50%,rgba(3,104,255,0.2)_-29.42deg,rgba(0,255,157,0.3)_122.88deg,rgba(3,104,255,0.2)_330.58deg,rgba(0,255,157,0.3)_482.88deg)]">
        {" "}
        <img
          className="w-35 h-10 absolute top-4 left-2 object-contain  z-10 "
          src={logo}
          alt="Logo"
        />
        <div className="  absolute inset-0 rounded-2xl">
          <img
            src={signbg}
            alt="Sign Background"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <div className=" h-[70%] w-[74%]  flex flex-col">
          <div className="flex w-full  flex-row justify-left items-center gap-8">
            <Link
              to="/"
              className="group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
              <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white order-1">
                Back
              </span>
            </Link>

            <div className="font-['Rajdhani'] font-thin text-[20px] leading-8 text-white order-1">
              Welcome, <br /> please{" "}
              <span className="bg-linear-to-r from-[#00FF9D] from-[35.58%] to-[#0368FF] to-[94.71%] bg-clip-text text-transparent font-thin">
                Sign up Here
              </span>
            </div>
          </div>

          {/* <div className="flex">
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                className="bg-[#2D2D2D] text-white placeholder:text-[#808080] border border-[#00FF9D] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[#2D2D2D] text-white placeholder:text-[#808080] border border-[#00FF9D] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-[#2D2D2D] text-white placeholder:text-[#808080] border border-[#00FF9D] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-[#00FF9D] text-black font-bold py-2 px-4 rounded-md hover:bg-[#00cc7a]"
              >
                Sign Up
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
