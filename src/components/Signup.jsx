import React from "react";
import signbg from "../images/signbg.svg";
import signDesktopBg from "../images/signDesktopBg.svg";
import logo from "../images/logo_h.png";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrimaryBtn2 from "./PrimaryBtn5";

const btnSignup = "Sign up";

function Signup() {
  return (
    <div className="bg-[#1E1E1E]">
      <div className="relative flex justify-center items-center min-h-210 md:h-200 w-screen md:w-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(3,104,255,0.2)_-29.42deg,rgba(0,255,157,0.3)_122.88deg,rgba(3,104,255,0.2)_330.58deg,rgba(0,255,157,0.3)_482.88deg)]">
        {" "}
        <img
          className="w-35 h-10 absolute top-4 left-2 object-contain  z-10 "
          src={logo}
          alt="Logo"
        />
        <div className=" absolute inset-0 rounded-2xl [anchor-name:--signfooter]">
          <img
            src={signbg}
            alt="Sign Background"
            className="md:hidden absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={signDesktopBg}
            alt="Sign Background"
            className="hidden md:block absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <p className="absolute bottom-[anchor(--signfooter_bottom)] left-[anchor(--signfooter_left)] -translate-y-8 w-full text-center font-['Rajdhani'] text-[12px] text-white/70">
          Powered by Scheme Manager Pro
        </p>
        <div className=" h-[70%] md:h-[67%]  flex flex-col md:-translate-y-10 justify-center items-center gap-4 md:gap-8 w-[80%] md:w-[50%] z-10">
          <div className="flex w-full  flex-row justify-left items-center gap-8">
            <Link
              to="/"
              className="group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
              <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
                Back
              </span>
            </Link>

            <div className="font-['Rajdhani'] font-thin text-[20px] leading-4 text-white">
              Welcome, <br /> please{" "}
              <span className="bg-linear-to-r from-[#00FF9D] from-[35.58%] to-[#0368FF] to-[94.71%] bg-clip-text text-transparent font-thin">
                Sign up Here
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full h-full z-999">
            <form className="flex flex-col gap-4 w-[90%] mt-4">
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Johnson"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="0612345678"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Username
              </label>
              <input
                type="email"
                placeholder="J...@gmail.com"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />

              <div className="flex flex-col flex-end">
                <div className="flex justify-center items-center gap-2">
                  <div className="p-px bg-linear-to-r from-[#0368FF] to-[#00FF9D] rounded-sm">
                    <input
                    id="rememberMe"
                      type="checkbox"
                      className="w-3.5 h-3.5 bg-[#F2F2F2] checked:bg-transparent rounded-[3px] border-none appearance-none checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat bg-size-[10px_10px] cursor-pointer block"
                    />
                  </div>

                  <label
                    className="font-['Rajdhani'] font-thin text-[12px] text-[#FFFFFF]"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <button className="flex justify-center items-center  bg-[#2A2A2A] rounded-full px-3 py-3 w-full mt-4">
                  <span className="inline-flex items-center justify-center mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5328 10.1871C19.5328 9.36773 19.4664 8.7698 19.3225 8.14972H9.96582V11.848H15.458C15.3473 12.7671 14.7493 14.1512 13.4206 15.0813L13.4019 15.2051L16.3603 17.497L16.5653 17.5174C18.4477 15.779 19.5328 13.2211 19.5328 10.1871Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M9.96566 19.9313C12.6563 19.9313 14.9152 19.0454 16.5651 17.5174L13.4204 15.0813C12.5789 15.6682 11.4494 16.0779 9.96566 16.0779C7.33032 16.0779 5.0936 14.3395 4.29627 11.9366L4.1794 11.9466L1.10322 14.3273L1.06299 14.4391C2.70177 17.6945 6.06795 19.9313 9.96566 19.9313Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.29626 11.9366C4.08588 11.3166 3.96412 10.6521 3.96412 9.96565C3.96412 9.27908 4.08588 8.61473 4.28519 7.99466L4.27962 7.8626L1.16489 5.44366L1.06298 5.49214C0.387557 6.84305 0 8.36008 0 9.96565C0 11.5712 0.387557 13.0882 1.06298 14.4391L4.29626 11.9366Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M9.96566 3.85336C11.837 3.85336 13.0992 4.66168 13.819 5.33718L16.6315 2.59107C14.9042 0.985496 12.6563 0 9.96566 0C6.06795 0 2.70177 2.23672 1.06299 5.49214L4.2852 7.99466C5.0936 5.59183 7.33032 3.85336 9.96566 3.85336Z"
                        fill="#EB4335"
                      />
                    </svg>
                  </span>
                  <span className="font-['Roboto'] text-base leading-6 md:leading-2 tracking-[0.15px] text-[#FCFBFF]">
                    Sign up with Google
                  </span>
                </button>

                <div className="mt-4 flex justify-between items-center w-[110%]">
                  <p className="font-['Rajdhani'] font-thin text-[9px] text-white">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="underline font-thin hover:text-gray-200"
                    >
                      Sign in
                    </a>
                  </p>
                  <PrimaryBtn2 btnSignup={btnSignup} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
