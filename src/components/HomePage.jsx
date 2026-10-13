import React from "react"; // Removed unused useState
import "../App.css";
import homeBG from "../images/bghomeSvg.svg";
import textureSvgHome from "../images/textureSvgHome.svg";
import logo from "../images/logoSvg.svg";

import w_left_home from "../images/w_left_home.svg";
import m_right_home from "../images/m_right_home.svg";
import shodowDown from "../images/shodowDown.svg";
import shadowsPC from "../images/shadowsPC.svg";
import Tstars from "../images/Tstars.svg";
import user1 from "../images/user1.svg";
import user2 from "../images/user2.svg";
import user3 from "../images/user3.svg";
import pollDeco from "../images/pollDeco.svg";
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
          <div className="w-full min-h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl md:text-4xl leading-0.5 font-light text-white mb-18 md:mb-60 family-['Raleway']">Testimonials</h1>
            
            <div className="testimonial_cards flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-6xl mx-auto relative">
              <img className="absolute top-1/2 -translate-y-1/2 left-12 h-175 md:rotate-90 md:left-1/2 md:-translate-x-1/2 md:-top-45" src={pollDeco} alt="poll" />
              {/* Card 1 */}
              <div className="Tcard before:-z-1 relative bg-zinc-900 h-40 md:h-70 w-80 md:w-full sm:w-72 max-w-sm rounded-2xl">
                <div className="relative z-10 w-full h-full p-6 text-white bg-[#0f0f0f] border-inherit rounded-2xl flex flex-col items-start justify-center gap-3">
                  <div className="flex flex-row items-center justify-start gap-3">
                    <div className="flex items-center justify-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={user1}
                        alt="Andries"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-0.5">
                      <p className="family-['Roboto-Condensed'] text-[18px]">
                        Andries
                      </p>
                      <img className="w-15" src={Tstars} alt="Rating" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] text-white/70 family-['Roboto-Condensed']">
                      “Managed to purchase land after saving money using Scheme
                      Manager Pro for 1 year”
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="Tcard before:-z-1 relative bg-zinc-900 h-40 md:h-70 w-80 md:w-full sm:w-72 max-w-sm rounded-2xl">
                <div className="relative z-10 w-full h-full p-6 text-white bg-[#0f0f0f] border-inherit rounded-2xl flex flex-col items-start justify-center gap-3">
                  <div className="flex flex-row items-center justify-start gap-3">
                    <div className="flex items-center justify-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={user2}
                        alt="Sophie"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-0.5">
                      <p className="family-['Roboto-Condensed'] text-[18px]">
                        Sophie
                      </p>
                      <img className="w-15" src={Tstars} alt="Rating" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] text-white/70 family-['Roboto-Condensed']">
                      “Was able to transition to full-time freelancing after
                      building an emergency fund using Scheme Manager Pro for 1
                      year”
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="Tcard before:-z-1 relative bg-zinc-900 h-40 md:h-70 w-80 md:w-full sm:w-72 max-w-sm rounded-2xl">
                <div className="relative z-10 w-full h-full p-6 text-white bg-[#0f0f0f] border-inherit rounded-2xl flex flex-col items-start justify-center gap-3">
                  <div className="flex flex-row items-center justify-start gap-3">
                    <div className="flex items-center justify-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={user3}
                        alt="Nova"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-0.5">
                      <p className="family-['Roboto-Condensed'] text-[18px]">
                        Nova
                      </p>
                      <img className="w-15" src={Tstars} alt="Rating" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] text-white/70 family-['Roboto-Condensed']">
                      “Automated insights helped our scheme track members behind
                      on payment”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
