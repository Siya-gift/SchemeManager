import React from "react"; // Removed unused useState
import "../App.css";
import homeBG from "../images/bghomeSvg.svg";
import textureSvgHome from "../images/textureSvgHome.svg";
import logo from "../images/logoSvg.svg";

import w_left_home from "../images/w_left_home.svg";
import m_right_home from "../images/m_right_home.svg";
import shodowDown from "../images/shodowDown.svg";
import shadowsPC from "../images/shadowsPC.svg";
import decoCards2 from "../images/decoCards2.png";
import PrimaryBtn from "./PrimaryBtn";
import PrimaryBtn2 from "./PrimaryBtn2";

function HomePage() {
  const btnSignin = "Sign in";
  const btnGetStarted = "Get Started";
  const btnLearn = "Learn More";

  return (
    <>
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover filter saturate-0"
          src={homeBG}
          alt="Home background"
        />
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={textureSvgHome}
          alt="Home background texture"
        />

        <nav className="relative z-70 flex items-center justify-between w-full px-5 py-4.25">
          <div className="logo-container">
            <img className="w-35 h-10 object-contain" src={logo} alt="Logo" />
          </div>

          <ul className="flex items-center gap-13">
            <li>
              <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                FAQ
              </button>
            </li>
            <li>
              <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                Pricing
              </button>
            </li>
            <li>
              <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                About us
              </button>
            </li>
            <li>
              <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                Contact
              </button>
            </li>
            <li className="cursor-pointer">
              <PrimaryBtn btnSignin={btnSignin} />
            </li>
          </ul>
        </nav>

        <img
          className="absolute bottom-0 left-30 w-60 h-75 object-cover"
          src={w_left_home}
          alt="picture"
        />

        <img
          className="absolute bottom-0 right-30 w-65 h-120 object-cover"
          src={m_right_home}
          alt="picture"
        />

        <img
          className="absolute bottom-0 left-0 w-full h-110 object-cover"
          src={shodowDown}
          alt="picture"
        />

        <img
          className="absolute bottom-0 left-0 w-full h-full object-cover"
          src={shadowsPC}
          alt="picture"
        />

        <img
          className="absolute w-180 bottom-5 left-1/2 -translate-x-1/2"
          src={decoCards2}
          alt="picture"
        />

        <div
          className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center justify-center gap-5 "
        >
          <h1 className=" text-center text-white text-[42px] font-semibold leading-10">
            Bringing your financial goals to <br />
            life.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00FF9D] from-36% to-[#0368FF] to-95% font-bold">
              Secure. Grow. Achieve.
            </span>
          </h1>

          <div className="flex flex-row items-center justify-center gap-3">
            <PrimaryBtn2 btnLearn={btnLearn} />
            <PrimaryBtn btnGetStarted={btnGetStarted} />
          </div>
        </div>
      </div>
      <div className="relative w-full h-screen overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-[-10%] w-[120%] h-[120%] bg-[radial-gradient(60%_92.31%_at_0%_0%,#005214_0%,rgba(0,82,20,0)_100%),radial-gradient(60%_92.31%_at_88%_82%,#0F0070_0%,rgba(15,0,112,0)_100%),radial-gradient(60%_92.31%_at_53.27%_0%,#215063_0%,rgba(33,80,99,0)_100%),radial-gradient(60%_92.31%_at_19.19%_56.58%,#000000_0%,rgba(0,0,0,0)_100%)] mix-blend-screen opacity-90 pointer-events-none"
          style={{
            animation: "slow-circle 70s infinite linear",
          }}
        />
        <style>{`
        @keyframes slow-circle {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(3%, 3%) rotate(90deg); }
          50% { transform: translate(0, 5%) rotate(180deg); }
          75% { transform: translate(-3%, 3%) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
        <div className="relative w-full h-full bg-black/10 backdrop-blur-[120px] flex flex-col justify-between">
  <div className="h-full w-full testimonial_cards flex gap-10 items-center justify-center">
    
    {/* Added an inner element or made the main card background semi-transparent / dark so the glow pops */}
    <div className="Tcard relative w-55 h-90 rounded-2xl">
      {/* Optional: Inner content container */}
      <div className="relative z-10 w-full h-full p-6 text-white">
        Your Card Content Here
      </div>
    </div>

  </div>
</div>
      </div>
    </>
  );
}

export default HomePage;
