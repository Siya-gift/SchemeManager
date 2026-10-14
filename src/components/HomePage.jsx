import React from "react"; // Removed unused useState
import "../App.css";
import homeBG from "../images/bghomeSvg.svg";
import textureSvgHome from "../images/textureSvgHome.svg";
import phoneHomebgTexture from "../images/phoneHomebgTexture.svg";
import logo from "../images/logoSvg.svg";

import w_left_home from "../images/w_left_home.svg";
import m_right_home from "../images/m_right_home.svg";
import shodowDown from "../images/shodowDown.svg";
import shadowDownMobile from "../images/shadowDownMobile.svg";
import shadowsPC from "../images/shadowsPC.svg";
import shadowsMobile from "../images/shadowsMobile.svg";
import Tstars from "../images/Tstars.svg";
import user1 from "../images/user1.svg";
import user2 from "../images/user2.svg";
import user3 from "../images/user3.svg";
import decor1 from "../images/decor1.png";
import decor2 from "../images/decor2.png";
import decor3 from "../images/decor3.png";
import pollDeco from "../images/pollDeco.svg";
import decoCards2 from "../images/decoCards2.png";
import blurPup from "../images/blurPup.svg";

import PrimaryBtn from "./PrimaryBtn";
import PrimaryBtn2 from "./PrimaryBtn2";
import PrimaryBtn3 from "./PrimaryBtn3";
import guideCd from "../images/guideCd.svg";
import bgPhoneGuide from "../images/bgPhoneGuide.svg";
import wGuidePic from "../images/wGuidePic.svg";
import GuidePhones from "../images/GuidePhones.svg";

function HomePage() {
  const btnSignin = "Sign in";
  const btnGetStarted = "Get Started";
  const btnLearn = "Learn More";
  const btnGuide = "Guide Me";

  return (
    <>
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <div className="w-full min-h-[90svh]">
          <div
            className="absolute top-0 left-0 w-full h-48 md:h-96 z-10 pointer-events-none
            bg-linear-to-t from-transparent via-black/20 to-black/20"
          />

          <img
            className="absolute inset-0 w-full h-full object-cover filter saturate-0 z-1"
            src={homeBG}
            alt="Home background"
          />
          <img
            className="hidden md:block absolute inset-0 w-full h-full object-cover z-1"
            src={textureSvgHome}
            alt="Home background texture"
          />
          <img
            className="md:hidden absolute inset-0 w-full h-full object-cover z-1"
            src={phoneHomebgTexture}
            alt="Home background texture"
          />

          <nav className="relative z-70 flex items-center justify-between w-full px-5 py-4.25">
            <div className="logo-container">
              <img className="w-35 h-10 object-contain" src={logo} alt="Logo" />
            </div>

            <div className="md:hidden menuHome rotate-180">
              <div className="burger z-50 w-6 h-3">
                <div className="line1 h-0.75 w-full z-20 bg-white rounded-sm"></div>
                <div className="line2 h-0.75 w-[70%] z-20 bg-white rounded-sm mt-1"></div>
                <div className="line3 h-0.75 w-full z-20 bg-white rounded-sm mt-1"></div>
              </div>
            </div>

            <div className="hidden md:block">
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
            </div>
          </nav>

          <img
            className="md:hidden absolute bottom-0 left-0 w-full h-screen object-cover z-1"
            src={shadowsMobile}
            alt="picture"
          />

          <img
            className="md:hidden absolute top-93 left-5 w-50 h-32 object-cover z-10"
            src={decor1}
            alt="card"
          />
          <img
            className="md:hidden absolute top-120 right-0 w-50 h-35 object-cover z-5"
            src={decor2}
            alt="card"
          />
          <img
            className="md:hidden absolute -bottom-2 left-5 w-50 h-32 z-10 object-cover"
            src={decor3}
            alt="card"
          />

          <img
            className="absolute bottom-0 -left-5 md:left-24 w-[130vw] md:w-70 aspect-1 md:aspect-1 md:h-72 object-cover z-7"
            src={w_left_home}
            alt="picture"
          />

          <img
            className="hidden md:block absolute bottom-0 right-30 w-65 h-120 object-cover z-7"
            src={m_right_home}
            alt="picture"
          />

          {/* <img
            className="hidden md:block absolute bottom-0 left-0 w-full h-110 object-cover z-8"
            src={shodowDown}
            alt="picture"
          /> */}
          {/* <img
            className="md:hidden absolute bottom-0 left-0 w-full h-30 object-cover z-8"
            src={shadowDownMobile}
            alt="picture"
          /> */}
          <div
            className="absolute bottom-0 left-0 w-full h-50 md:h-100 z-8 pointer-events-none
            bg-linear-to-b from-transparent via-black/20 to-black/70"
          />

          <img
            className="hidden md:block absolute bottom-0 left-0 w-full h-full object-cover z-8"
            src={shadowsPC}
            alt="picture"
          />

          <img
            className="hidden md:block absolute w-180 bottom-5 left-1/2 -translate-x-1/2 z-20"
            src={decoCards2}
            alt="picture"
          />

          <div
            className="absolute w-full top-30 md:top-1/2 left-1/2 -translate-x-1/2 
   md:-translate-y-1/2    flex flex-col items-center justify-center gap-3 z-20"
          >
            <h1 className=" text-center text-white text-[32px] md:text-[42px] max-w-75 md:max-w-full font-semibold leading-10 md:leading-10">
              Bringing your financial goals to <br />
              life.{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00FF9D] from-36% to-[#0368FF] to-95% font-bold">
                Secure. Grow. Achieve.
              </span>
            </h1>

            <div className="flex flex-row items-center justify-center gap-0 md:gap-3">
              <PrimaryBtn2 btnLearn={btnLearn} />
              <PrimaryBtn btnGetStarted={btnGetStarted} />
            </div>
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
            <h1 className="text-2xl md:text-4xl leading-0.5 font-light text-white mb-18 md:mb-40 family-['Raleway']">
              Testimonials
            </h1>

            <div className="testimonial_cards flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-6xl mx-auto relative">
              <img
                className="absolute top-1/2 -translate-y-1/2 left-12 h-175 md:rotate-90 md:left-1/2 md:-translate-x-1/2 md:-top-30"
                src={pollDeco}
                alt="poll"
              />
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
      <div className="relative w-full h-screen bg-white overflow-hidden">
        <div className="relative w-full h-screen overflow-hidden bg-white">
          <div
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,#00FF9D33_34%,#0368FF33_92%)] pointer-events-none"
            style={{
              animation: "slow-circle 70s infinite linear",
            }}
          />
          <style>
            {`
              @keyframes slow-circle {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(3%, 3%) rotate(90deg); }
                50% { transform: translate(0, 5%) rotate(180deg); }
                75% { transform: translate(-3%, 3%) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
              }
            `}
          </style>
          <div className="relative w-full h-full bg-white/10 backdrop-blur-[120px]">
            <div className="flex h-full w-full">
              <div className="h-full w-full flex items-center justify-end">
                <div className="relative w-full h-full">
                  {/* Pc view */}
                  <div
                    className="relative top-[min(50%,400px)] left-90 -translate-x-1/2 -translate-y-1/2 hidden md:block w-[max(31.25rem,50vw)] h-[max(100%,80svh)] bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${guideCd})`,
                    }}
                    aria-label="Guide CD"
                  >
                    <div className="guideContent absolute top-140 left-20 flex flex-col gap-5">
                      <h1 className=" text-[clamp(42px,100svh,86px)] font-black text-[#FF00F2] text-start balance leading-15">
                        Explore every Financial freedom
                      </h1>
                      <div className="flex flex-row items-center gap-3 text-start">
                        <h3 className="text-[16px] w-40 font-bold text-[#34E442]">
                          Easy to use. need <br /> guidance ?
                        </h3>
                        <div className="w-35">
                          <PrimaryBtn3 btnGuide={btnGuide} />
                        </div>
                      </div>
                    </div>

                    <img
                      className="absolute bottom-10 left-0 h-50 -z-1"
                      src={blurPup}
                      alt="blur"
                    />
                  </div>

                  {/* Mobile view */}
                  <div
                    className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  md:hidden h-150 w-70 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgPhoneGuide})` }}
                    aria-label="Guide CD"
                  >
                    <h1 className="absolute top-20 left-10 text-[32px] font-black text-[#FF00F2] text-start balance leading-8 w-50">
                      Explore every Financial freedom
                    </h1>
                    <h3 className="absolute top-60 left-10 text-[13px] w-30 font-bold text-[#34E442]">
                      Easy to use. need <br /> guidance ?
                    </h3>

                    <div className="hidden absolute left-10 bottom-40">
                      <div className="flex flex-row items-center gap-3 text-start">
                        <h3 className="text-[16px] w-40 font-bold text-[#34E442]">
                          Easy to use. need <br /> guidance ?
                        </h3>
                        <div className="w-35">
                          <PrimaryBtn3 btnGuide={btnGuide} />
                        </div>
                      </div>
                    </div>

                    <img
                      className="absolute top-30 -right-10 h-50 -z-1"
                      src={blurPup}
                      alt="blur"
                    />
                    <img
                      className="absolute bottom-10 left-0 h-50 -z-1"
                      src={blurPup}
                      alt="blur"
                    />
                    <img
                      className="md:hidden absolute top-95 left-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-110 h-200"
                      src={GuidePhones}
                      alt="Guide Phones"
                    />
                    <div className="md:hidden absolute bottom-10 left-8 w-30  h-20 text-2xl z-30">
                      <PrimaryBtn3 btnGuide={btnGuide} />
                    </div>
                  </div>

                  <img
                    className="hidden md:block absolute top-1/2 left-[min(55rem,calc(100vw-21rem))] 
                    -translate-x-1/2 -translate-y-1/2 pointer-events-none w-110 h-100 scale-150 "
                    src={GuidePhones}
                    alt="Guide Phones"
                  />
                </div>
              </div>
            </div>

            <img
              className="absolute h-80 md:h-120 max-h-140 bottom-0 left-70 md:left-1/2 -translate-x-1/2 z-10"
              src={wGuidePic}
              alt="w_guidePic"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
