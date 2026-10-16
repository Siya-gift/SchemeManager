import React, { useState } from "react"; // Removed unused useState
import "../App.css";
import homeBG from "../images/bghomeSvg.svg";
import proveBG from "../images/proveBG.jpg";
import plan_BG_image from "../images/plan_BG_image.svg";
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
import PrimaryBtn4 from "./PrimaryBtn4";
import guideCd from "../images/guideCd.svg";
import bgPhoneGuide from "../images/bgPhoneGuide.svg";
import wGuidePic from "../images/wGuidePic.svg";
import GuidePhones from "../images/GuidePhones.svg";
import proveCard from "../images/proveCard.svg";
import mobilePbg from "../images/mobilePbg.svg";
import arrowD from "../images/arrowD.svg";
import arrowU from "../images/arrowU.svg";
import CheckMark from "../images/CheckMark.svg";

function HomePage() {
  const btnSignin = "Sign in";
  const btnGetStarted = "Get Started";
  const btnLearn = "Learn More";
  const btnGuide = "Guide Me";
  const btnGetPlan = "Get Plan";

  const [proveState1, proveStateFunc1] = useState(false);
  const [proveState2, proveStateFunc2] = useState(false);
  const [proveState3, proveStateFunc3] = useState(false);

  const openProve1 = () => proveStateFunc1(!proveState1);
  const openProve2 = () => proveStateFunc2(!proveState2);
  const openProve3 = () => proveStateFunc3(!proveState3);

  return (
    <>
      <div className="h-dvh relative overflow-y-auto glass-scroll snap-y snap-mandatory bg-black">
        {/* <div className="hidden fixed inset-0 z-9999 flex flex-col items-center justify-center gap-4 bg-black/70 h-full w-full backdrop-blur-[5px]">
          
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 animate-spin flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-0"></div>
              <div className="w-2.5 h-2.5 bg-white/80 rounded-full absolute right-0"></div>
              <div className="w-2.5 h-2.5 bg-white/60 rounded-full absolute bottom-0"></div>
              <div className="w-2.5 h-2.5 bg-white/40 rounded-full absolute left-0"></div>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-base font-medium tracking-wide animate-pulse">
            Loading...
          </p>
        </div> */}

        <section className="relative w-full min-h-dvh snap-start snap-always bg-white overflow-hidden">
          <div className="w-full h-full">
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
              <div className="logo-container group relative overflow-clip cursor-pointer">
                {/* The Logo */}
                <img
                  className="w-35 h-10 object-contain relative z-10 "
                  src={logo}
                  alt="Logo"
                />

                <div className="premiumShine pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[200%] -translate-x-full rounded-2xl group-hover:animate-shine" />
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
                      Ask AI
                    </button>
                  </li>
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
              className="md:hidden absolute top-93 left-5 w-50 h-32 object-cover z-5"
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
            <div
              className="absolute bottom-0 left-0 w-full h-50 md:h-100 z-8 pointer-events-none
            bg-linear-to-b from-transparent via-black/20 to-black/70"
            />
            <img
              className="hidden md:block absolute bottom-0 left-0 w-full h-full object-cover z-8"
              src={shadowsPC}
              alt="picture"
            />
            <div className="hidden md:block absolute w-180 bottom-5 left-1/2 -translate-x-1/2 z-20">
              <img src={decoCards2} alt="picture" />
            </div>
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
        </section>
        <section className="relative w-full min-h-dvh snap-start snap-always overflow-hidden bg-[#000000]">
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
          <div className="relative w-full h-dvh bg-black/10 backdrop-blur-[120px] flex flex-col justify-center items-center">
            <div className="w-full h-80vh flex flex-col items-center justify-center p-16 ">
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
                <div className="Tcard relative isolate box-border h-40 md:h-70 w-full max-w-sm min-w-0 rounded-2xl group cursor-pointer">
                  {/* Inner wrapper clips content and shine, not the outer glow */}
                  <div className="relative z-10 h-full w-full min-w-0 rounded-2xl overflow-hidden">
                    {/* Card content */}
                    <div className="relative z-10 flex h-full w-full min-w-0 flex-col items-start justify-center gap-3 rounded-2xl bg-[#0f0f0f] p-6 text-white">
                      <div className="flex min-w-0 flex-row items-center justify-start gap-3">
                        <img
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                          src={user1}
                          alt="Andries"
                        />

                        <div className="flex min-w-0 flex-col items-start justify-start gap-0.5">
                          <p className="family-['Roboto_Condensed'] text-[18px]">
                            Andries
                          </p>

                          <img
                            className="w-15 max-w-full"
                            src={Tstars}
                            alt="Rating"
                          />
                        </div>
                      </div>

                      <p className="w-full min-w-0 wrap-break-word text-[12px] text-white/70 family-['Roboto_Condensed']">
                        “Managed to purchase land after saving money using
                        Scheme Manager Pro for 1 year”
                      </p>
                    </div>

                    <div className="premiumShine pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[200%] -translate-x-full rounded-2xl group-hover:animate-shine" />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="Tcard relative isolate box-border h-40 md:h-70 w-full max-w-sm min-w-0 rounded-2xl group cursor-pointer">
                  {/* Inner wrapper clips content and shine, not the outer glow */}
                  <div className="relative z-10 h-full w-full min-w-0 rounded-2xl overflow-hidden">
                    {/* Card content */}
                    <div className="relative z-10 flex h-full w-full min-w-0 flex-col items-start justify-center gap-3 rounded-2xl bg-[#0f0f0f] p-6 text-white">
                      <div className="flex min-w-0 flex-row items-center justify-start gap-3">
                        <img
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                          src={user2}
                          alt="Andries"
                        />

                        <div className="flex min-w-0 flex-col items-start justify-start gap-0.5">
                          <p className="family-['Roboto_Condensed'] text-[18px]">
                            Sophie
                          </p>

                          <img
                            className="w-15 max-w-full"
                            src={Tstars}
                            alt="Rating"
                          />
                        </div>
                      </div>

                      <p className="w-full min-w-0 wrap-break-word text-[12px] text-white/70 family-['Roboto_Condensed']">
                        “Was able to transition to full-time freelancing after
                        building an emergency fund using scheme manager pro for
                        1 year”
                      </p>
                    </div>

                    <div className="premiumShine pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[200%] -translate-x-full rounded-2xl group-hover:animate-shine" />
                  </div>
                </div>

                {/* Card 3 */}
                <div className="Tcard relative isolate box-border h-40 md:h-70 w-full max-w-sm min-w-0 rounded-2xl group cursor-pointer">
                  {/* Inner wrapper clips content and shine, not the outer glow */}
                  <div className="relative z-10 h-full w-full min-w-0 rounded-2xl overflow-hidden">
                    {/* Card content */}
                    <div className="relative z-10 flex h-full w-full min-w-0 flex-col items-start justify-center gap-3 rounded-2xl bg-[#0f0f0f] p-6 text-white">
                      <div className="flex min-w-0 flex-row items-center justify-start gap-3">
                        <img
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                          src={user3}
                          alt="Andries"
                        />

                        <div className="flex min-w-0 flex-col items-start justify-start gap-0.5">
                          <p className="family-['Roboto_Condensed'] text-[18px]">
                            Nova
                          </p>

                          <img
                            className="w-15 max-w-full"
                            src={Tstars}
                            alt="Rating"
                          />
                        </div>
                      </div>

                      <p className="w-full min-w-0 wrap-break-word text-[12px] text-white/70 family-['Roboto_Condensed']">
                        “Automated insights helped our scheme to track members
                        behind on payment”
                      </p>
                    </div>

                    <div className="premiumShine pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[200%] -translate-x-full rounded-2xl group-hover:animate-shine" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative w-full min-h-dvh snap-start snap-always bg-white overflow-hidden">
          <div className="relative w-full h-svh overflow-hidden bg-white">
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
                        zIndex: 10,
                      }}
                      aria-label="Guide CD"
                    >
                      <div className="guideContent absolute top-140 left-20 flex flex-col gap-5 z-100">
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
                          <div className="w-35 z-80">
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
                      <div className="md:hidden absolute bottom-10 left-8 w-30  h-20 text-2xl z-80">
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
        </section>
        <section
          className="relative w-full min-h-dvh snap-start snap-always bg-white overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${proveBG})`,
            zIndex: 20,
          }}
        >
          <div className="relative w-full h-svh overflow-hidden bg-[#FF0033]/40 z-2">
            <div className="prove absolute inset-0 w-full h-full object-contain flex flex-col justify-center md:justify-center lg:justify-center items-center p-20 z-4 gap-18 md:gap-0">
              <h1 className="mt-20 w-[58vw] md:w-[45vw] h-fit text-[32px] md:text-[55px]  font-black leading-8 md:leading-11 text-transparent bg-clip-text bg-linear-to-r from-[#00FF9D] from-36% to-[#0368FF] to-95% z-10">
                Why choose Scheme manager pro?
              </h1>
              {/* pc view */}
              <div className="hidden min-[900px]:block">
                <div
                  className="flex items-center justify-center p-6 md:p-12 w-full max-w-3xl aspect-video bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${proveCard})`,
                    zIndex: 20,
                  }}
                >
                  <div className="flex items-center justify-center w-[95%] h-[75%]">
                    <div className="flex h-full w-full justify-end p-2 gap-7">
                      <div className="flex flex-col gap-1 text-start items-center justify-center">
                        <h3 className="text-white text-[16px] font-normal family-['Roboto_Condensed'] wrap-break-word ">
                          Taking <br /> Accountability
                        </h3>
                        <p className="text-white text-[9px] font-normal family-['Roboto_Condensed']">
                          We believe that true leadership starts with taking
                          full ownership of our actions, decisions, and
                          outcomes. We do not hide behind corporate buzzwords or
                          shy away from difficult situations; instead, we stand
                          firmly behind the promises we make to you. If a
                          challenge arises, our focus is entirely on finding
                          immediate solutions and ensuring your goals are met
                          without disruption. By holding ourselves to the
                          highest operational standards, we provide you with a
                          reliable partnership where excuses are replaced by
                          definitive results.
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 text-start items-center justify-center">
                        <h3 className="text-white text-[16px] font-normal family-['Roboto_Condensed'] wrap-break-word">
                          Openness
                        </h3>
                        <p className="text-white text-[9px] font-normal family-['Roboto_Condensed']">
                          Transparency is the foundation of our communication
                          style. We maintain an environment of complete
                          openness, ensuring you have clear, unrestricted
                          visibility into our processes, pricing, and project
                          timelines from day one. By sharing honest insights,
                          realistic expectations, and regular updates, we
                          eliminate guesswork and unexpected surprises. We
                          welcome your feedback, promote collaborative dialogue,
                          and keep the door open for any questions you have,
                          making your experience entirely straightforward and
                          stress-free.
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 text-start items-center justify-center">
                        <h3 className="text-white text-[16px] font-normal family-['Roboto_Condensed'] wrap-break-word">
                          Trustworthiness
                        </h3>
                        <p className="text-white text-[9px] font-normal family-['Roboto_Condensed']">
                          Trust cannot be demanded; it must be earned through
                          consistent ethical behavior and uncompromised
                          integrity. Over the years, we have built our
                          reputation on doing exactly what we say we will do,
                          safeguarding your data, projects, and investments with
                          the absolute highest standards of confidentiality.
                          When you choose us, you are partnering with an
                          organization that values long-term relationships over
                          short-term wins, giving you the peace of mind that
                          your interests are always in safe, dependable hands.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile view */}
              <div className="min-[900px]:hidden">
                <div
                  className="w-[90%] h-79 flex relative p-50 min-[500px]:p-80  mt-10 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${mobilePbg})`,
                    zIndex: 20,
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[67%] h-[80%] p-5 flex items-center justify-center transition-all duration-75">
                    <div className="relative h-full w-full flex flex-col justify-evenly overflow-auto scrollbar-none [&::-webkit-scrollbar]:hidden text-[#e3e3e3] mask-[linear-gradient(to_bottom,black_60%,transparent_100%)]">
                      <div className="h-[30%]">
                        <div
                          className="flex justify-between items-center text-[#e3e3e3]"
                          onClick={() => openProve1()}
                        >
                          <h1 className="text-sm family-['Roboto_Condense']">
                            Taking <br /> Accountability
                          </h1>
                          <div
                            className={`transition-transform duration-500 h-1.25 ${proveState1 ? "rotate-180" : ""}`}
                          >
                            <img src={arrowD} />
                          </div>
                        </div>
                        <hr className="border-[.7px] text-[#e3e3e3] mt-2" />
                      </div>
                      {proveState1 && (
                        <div className="p-6">
                          <p className=" text-[11px] text-[#e3e3e3]">
                            We believe that true leadership starts with taking
                            full ownership of our actions, decisions, and
                            outcomes. We do not hide behind corporate buzzwords
                            or shy away from difficult situations. Instead, we
                            stand firmly behind the promises we make to you. If
                            a challenge arises, our focus is entirely on finding
                            immediate solutions and ensuring your goals are met
                            without disruption. By holding ourselves to the
                            highest operational standards, we provide you with a
                            reliable partnership where excuses are replaced by
                            definitive results.
                          </p>
                        </div>
                      )}

                      <div className="h-[30%] mt-5">
                        <div
                          className="flex justify-between items-center text-[#e3e3e3]"
                          onClick={() => openProve2()}
                        >
                          <h1 className="text-sm family-['Roboto_Condense']">
                            Openness
                          </h1>
                          <div
                            className={`transition-transform duration-500 h-1.25 ${proveState2 ? "rotate-180" : ""}`}
                          >
                            <img src={arrowD} />
                          </div>
                        </div>
                        <hr className="border-[.7px] text-[#e3e3e3] mt-2" />
                      </div>
                      {proveState2 && (
                        <div className="p-6">
                          <p className="text-[11px] text-[#e3e3e3]">
                            Transparency is the foundation of our communication
                            style. We maintain an environment of complete
                            openness, ensuring you have clear, unrestricted
                            visibility into our processes, pricing, and project
                            timelines from day one. By sharing honest insights,
                            realistic expectations, and regular updates, we
                            eliminate guesswork and unexpected surprises. We
                            welcome your feedback, promote collaborative
                            dialogue, and keep the door open for any questions
                            you have, making your experience entirely
                            straightforward and stress-free.
                          </p>
                        </div>
                      )}

                      <div className="h-[30%] my-5">
                        <div
                          className="flex justify-between items-center text-[#e3e3e3]"
                          onClick={() => openProve3()}
                        >
                          <h1 className="text-sm family-['Roboto_Condense']">
                            Trustworthiness
                          </h1>
                          <div
                            className={`transition-transform duration-500 h-1.25 ${proveState3 ? "rotate-180" : ""}`}
                          >
                            <img src={arrowD} />
                          </div>
                        </div>
                        <hr className="border-[.7px] text-[#e3e3e3] mt-2" />
                      </div>
                      {proveState3 && (
                        <div className="p-6">
                          <p className="text-[11px] text-[#e3e3e3]">
                            Trust cannot be demanded; it must be earned through
                            consistent ethical behavior and uncompromised
                            integrity. Over the years, we have built our
                            reputation on doing exactly what we say we will do,
                            safeguarding your data, projects, and investments
                            with the absolute highest standards of
                            confidentiality. When you choose us, you are
                            partnering with an organization that values
                            long-term relationships over short-term wins, giving
                            you the peace of mind that your interests are always
                            in safe, dependable hands.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="relative w-full min-h-dvh snap-start snap-always bg-[#0E0019]/96 overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${plan_BG_image})`,
            zIndex: 20,
          }}
        >
          {/* pc view */}
          <div className="absolute inset-0 flex justify-center items-center gap-20 w-full h-full">
            {/* c1 */}
            <div className="relative isolate group overflow-hidden w-60 h-100 rounded-[15px] p-8 flex flex-col items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]">
              <div className="cursor-pointer absolute inset-0 z-20 overflow-hidden rounded-[15px]">
                <div className="flex flex-col justify-evenly w-full h-full px-5 py-3">
                  <div className="w-full h-full flex flex-col ">
                    <h4 className="planCardFont1 text-[#AFAFAF] text-[18px] family-['Rajdhani'] font-bold">
                      R 150/<span className="text-[8px]">Month</span>
                    </h4>
                    <h1 className="text-[34px] family-['Poppins'] font-black leading-7 pb-2  bg-linear-to-r from-[#D900FF] from-[8.17%] via-[#6C73FF]/45 via-[74.52%] to-[#00E9FF]/20 to-[87.98%] bg-clip-text text-transparent h-fit">
                      Starter <br /> plan
                    </h1>
                    <p className="fontRaleway family-['Raleway'] font-thin tracking text-[10px] leading-3 text-[#e3e3e3]">
                      Get started by using this plan and get <br /> the basic
                      and useful features.
                    </p>
                  </div>

                  <div className="flex flex-col h-full gap-2">
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Vote for management
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Limited number of schemes & members
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Get email notifications
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        No automation features
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        No backup storage
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                  </div>
                </div>

                <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
              </div>
            </div>

            {/* c2 */}
            <div className="relative isolate group overflow-hidden w-60 h-100 rounded-[15px] p-8 flex flex-col items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]">
              <div className="cursor-pointer absolute inset-0 z-20 overflow-hidden rounded-[15px]">
                <div className="flex flex-col justify-evenly w-full h-full px-5 py-3">
                  <div className="w-full h-full flex flex-col ">
                    <h4 className="planCardFont1 text-[#AFAFAF] text-[18px] family-['Rajdhani'] font-bold">
                      R 299/<span className="text-[8px]">Month</span>
                    </h4>
                    <h1 className="text-[34px] family-['Poppins'] font-black leading-7 pb-2  bg-linear-to-r from-[#0368FF] from-0% via-[#6C73FF]/45 via-[46.63%] to-[#00FF9D] to-[97.12%] bg-clip-text text-transparent h-fit">
                      Standard <br /> plan
                    </h1>
                    <p className="fontRaleway family-['Raleway'] font-thin tracking text-[10px] leading-3 text-[#e3e3e3]">
                      The Complete Guide to Launching, <br /> Managing, and
                      Scaling Your Schemes.
                    </p>
                  </div>

                  <div className="flex flex-col h-full gap-2">
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Vote for management
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Get 10 schemes and 10 members
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Automated payments
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Fast human consultant response
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Build global public schemes to <br /> attract members
                        worldwide
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Download backup Files
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                  </div>
                </div>

                <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
              </div>
            </div>

            {/* c3 */}
            <div className="relative isolate group overflow-hidden w-60 h-100 rounded-[15px] p-8 flex flex-col items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]">
              <div className="cursor-pointer absolute inset-0 z-20 overflow-hidden rounded-[15px]">
                <div className="flex flex-col justify-evenly w-full h-full px-5 py-3">
                  <div className="w-full h-full flex flex-col ">
                    <h4 className="planCardFont1 text-[#AFAFAF] text-[18px] family-['Rajdhani'] font-bold">
                      R 999/<span className="text-[8px]">Month</span>
                    </h4>
                    <h1 className="text-[34px] family-['Poppins'] font-black leading-7 pb-2  bg-linear-to-r from-[#FFEE00]/50 from-0% via-[#FFA96C]/45 via-[26.92%] to-[#B7FF00]/20 to-[66.83%] bg-clip-text text-transparent h-fit">
                      Premium <br /> plan
                    </h1>
                    <p className="fontRaleway family-['Raleway'] font-thin tracking text-[10px] leading-3 text-[#e3e3e3]">
                      Supercharge your experience. Upgrade to <br />
                      Premium for full access to our core & <br />
                      advanced toolkits.
                    </p>
                  </div>

                  <div className="flex flex-col h-full gap-2">
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Vote for management
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Unlimited number of schemes & members
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Automation features
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Generating unlimited reports
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Monthly payment reminder
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Invite members via whatsApp
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <div className="checkM h-3 w-3">
                        <img src={CheckMark} alt="-" />
                      </div>
                      <p className="fontRaleway font-thin text-[9px] tracking-normal text-white">
                        Unlimited downloads
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                  </div>
                </div>

                <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
