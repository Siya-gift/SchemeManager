import React, { useState, useEffect, useRef, useCallback } from "react"; // Removed unused useState
import gsap from "gsap";
import "../App.css";
import homeBG from "../images/bghomeSvg.svg";
import proveBG from "../images/proveBG.jpg";
import plan_BG_image from "../images/plan_BG_image.svg";
import textureSvgHome from "../images/textureSvgHome.svg";
import phoneHomebgTexture from "../images/phoneHomebgTexture.svg";
import logo from "../images/logoSvg.svg";
import HomeMobileMenu from "./HomeMobileMenu";

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
import upgradePic from "../images/upgradePic.svg";
import call_bg from "../images/call_bg.svg";
import cellMan from "../images/cellMan.svg";
import InstagramV from "../images/InstagramV.svg";
import FacebookV from "../images/FacebookV.svg";
import WhatsAppV from "../images/WhatsAppV.svg";
import TikTokV from "../images/TikTokV.svg";
import linesCall from "../images/linesCall.svg";
import bg_info_mobile from "../images/bg_info_mobile.svg";
import bg_info_desktop from "../images/bg_info_desktop.svg";
import m_hand from "../images/m_hand.svg";
import p_hand from "../images/p_hand.svg";
import BG_footer_p from "../images/BG_footer_p.svg";
import BG_footer_m from "../images/BG_footer_m.svg";
import footer_card_m from "../images/footer_card_m.png";
import m_phoneHand from "../images/m_phoneHand.svg";
import footer_card_p from "../images/footer_card_p.png";
import m_grand_logo from "../images/m_grand_logo.svg";
import p_2grand_logo from "../images/p_2grand_logo.svg";
import m_payM_pic from "../images/m_payM_pic.svg";
import pc_payM_pics from "../images/pc_payM_pics.svg";

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
import pcPlanTitle from "../images/pcPlanTitle.svg";
import magic_wood from "../images/magic_wood.svg";
import { supabase } from "../lib/supabaseClient";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { plan_data } from "../lib/planData.js";

function HomePage() {
  const btnSignin = "Sign in";
  const btnGetStarted = "Get Started";
  const btnLearn = "Learn More";
  const btnGuide = "Guide Me";
  const btnGetPlan = "Get Plan";

  const [proveState1, proveStateFunc1] = useState(false);
  const [proveState2, proveStateFunc2] = useState(false);
  const [proveState3, proveStateFunc3] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollHideTimeoutRef = useRef(null);
  const svgRef = useRef(null);

  const [activePlan, setActivePlan] = useState(1);
  const [activePlanCard, setActivePlanCard] = useState(1);
  const [activePlanCardSpan, setActivePlanCardSpan] = useState(1);

  const openProve1 = () => proveStateFunc1(!proveState1);
  const openProve2 = () => proveStateFunc2(!proveState2);
  const openProve3 = () => proveStateFunc3(!proveState3);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handlePageScroll = useCallback((event) => {
    const container = event.currentTarget;

    if (scrollHideTimeoutRef.current) {
      window.clearTimeout(scrollHideTimeoutRef.current);
    }

    if (container.scrollTop <= 200) {
      setShowScrollToTop(false);
      return;
    }

    setShowScrollToTop(true);
    scrollHideTimeoutRef.current = window.setTimeout(() => {
      setShowScrollToTop(false);
      scrollHideTimeoutRef.current = null;
    }, 5000);
  }, []);

  const changePlan = (id) => {
    setActivePlan(id);
    setActivePlanCard(id);
    setActivePlanCardSpan(id);
  };

  const [verifiedUser, setVerifiedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minDelayPassed, setMinDelayPassed] = useState(false);
  const navigate = useNavigate();

  // 1. Check session on mount & listen for Google login/logout changes
  useEffect(() => {
    const checkInitialUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setVerifiedUser(session?.user ?? null);
      setLoading(false);
    };

    checkInitialUser();

    // Automatically updates verifiedUser when Google redirects back or user signs out
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setVerifiedUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Verify user on button click and update state
  const handleGoogleUserVerified = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setVerifiedUser(null);
        navigate("/Signin");
        return;
      }

      // Extract name from raw_user_meta_data
      const userName =
        user.user_metadata?.name || user.user_metadata?.full_name || "Member";

      // Update your verifiedUser state with the user object and extracted name
      setVerifiedUser({
        ...user,
        displayName: userName,
      });

      navigate("/Dashboard");
    } catch (err) {
      console.error("Verification error:", err);
      setVerifiedUser(null);
      navigate("/Signin");
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowScrollToTop(container.scrollTop > 200);

    return () => {
      if (scrollHideTimeoutRef.current) {
        window.clearTimeout(scrollHideTimeoutRef.current);
      }
    };
  }, [loading, minDelayPassed]);

  const handleScrollToTop = () => {
    const container = scrollContainerRef.current;
    setShowScrollToTop(false);

    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // 1. Minimum delay timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // 2. GSAP stroke-drawing animation hook
  useEffect(() => {
    if (!loading && minDelayPassed) return;
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      const paths = svgRef.current.querySelectorAll("path");

      paths.forEach((path, index) => {
        const length = path.getTotalLength();

        // Hide stroke initially
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        // Loop the drawing/undrawing
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2 + index * 0.1,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });
      });
    });

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, [loading, minDelayPassed]);

  // 3. Conditional render for loading state
  if (loading || !minDelayPassed) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center gap-4 overflow-hidden">
        

        {/* Attached ref to the SVG */}
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width="131"
          height="145"
          viewBox="0 0 131 145"
          fill="none"
        >
          <path
            d="M51.7225 31.5054C22.7226 31.4247 0.658676 54.3634 0.575223 84.3633C0.494553 113.363 22.4361 134.424 51.4359 134.505C80.4358 134.586 102.494 113.647 102.575 84.6471C102.655 55.6472 80.7223 31.5861 51.7225 31.5054Z"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
          <path
            opacity="0.6"
            d="M51.8424 40.2486C27.3384 40.1804 9.64096 59.7346 9.5728 84.2386C9.50464 108.743 27.0985 126.435 51.6025 126.503C76.1065 126.571 93.7985 108.977 93.8666 84.4731C93.9348 59.9691 76.3464 40.3168 51.8424 40.2486Z"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
          <path
            d="M48.6668 47.4969L58.6668 47.5248L58.6445 55.5247C67.6417 56.5498 72.6305 60.5637 74.6138 66.5692L64.6028 70.5414C61.6167 65.533 58.6222 63.5247 52.6223 63.508C45.6223 63.4885 42.614 66.4802 42.6028 70.4802C42.5917 74.4801 47.5889 75.4941 55.5833 77.5163C68.5749 80.5525 74.561 85.5691 74.536 94.5691C74.5109 103.569 68.4943 109.552 58.4887 111.525L58.4693 118.524L48.4693 118.497L48.4888 111.497C38.4916 110.469 32.5027 106.452 29.5222 99.4439L39.5361 94.4717C42.5194 100.48 47.5138 102.494 53.5138 102.511C59.5138 102.527 63.5221 99.5385 63.5332 95.5385C63.5443 91.5385 59.5499 89.5274 50.5555 87.5024C38.5639 84.469 32.5751 80.4523 32.6001 71.4523C32.6251 62.4524 38.639 57.4691 48.6445 55.4969L48.6668 47.4969Z"
            strokeWidth="0.95"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
          <path
            d="M67.8086 0.549894L129.808 0.722362L129.778 11.7223L107.686 44.661L93.6861 44.622L61.7781 11.5332L67.8086 0.549894Z"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
          <path
            opacity="0.6"
            d="M67.8086 0.549894L87.7585 18.6055M87.7585 18.6055L61.7781 11.5332M87.7585 18.6055L129.808 0.722362M87.7585 18.6055L93.6861 44.622M87.7585 18.6055L107.753 20.6611M107.753 20.6611L107.686 44.661M107.753 20.6611L129.778 11.7223"
            strokeWidth="0.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
          <path
            d="M107.686 44.6611L125.527 101.711L105.514 106.655L87.4107 143.605L79.4525 128.583"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
          <path
            opacity="0.6"
            d="M99.6694 50.6388L106.533 99.6581M106.533 99.6581L87.4108 143.605M106.533 99.6581L125.527 101.711"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="white"
          />
        </svg>

        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div
      className="h-screen relative overflow-y-auto glass-scroll bg-black"
      ref={scrollContainerRef}
      data-lenis-prevent
      onScroll={handlePageScroll}
    >
      <section className="relative w-full h-full bg-white overflow-hidden">
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

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="min-[882px]:hidden menuHome rotate-180 cursor-pointer p-2 -mr-2 focus:outline-none"
            >
              <div className="burger z-50 w-6 h-4 flex flex-col justify-center">
                <div
                  className={`line1 h-0.75 w-full z-20 bg-white rounded-sm transition-all duration-300 origin-center ${
                    menuOpen ? "translate-y-1.75 rotate-45" : ""
                  }`}
                />
                <div
                  className={`line2 h-0.75 w-full z-20 bg-white rounded-sm mt-1 transition-all duration-300 ${
                    menuOpen ? "opacity-0 translate-x-2" : "opacity-100"
                  }`}
                />
                <div
                  className={`line3 h-0.75 w-full z-20 bg-white rounded-sm mt-1 transition-all duration-300 origin-center ${
                    menuOpen ? "-translate-y-1.75 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>

            <div className="hidden min-[882px]:block">
              <ul className="flex items-center gap-13">
                <Link
                  to={
                    "https://tawk.to/chat/6af8d12f594d653c431702de/1k7dv29b4?layout=modern"
                  }
                >
                  <li className="">
                    <button className="flex items-center gap-3 text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                      <img className="h-4" src={magic_wood} alt="AI" />
                      <span>Ask AI</span>
                    </button>
                  </li>
                </Link>
                <Link to={"FAQ"}>
                  <li>
                    <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                      FAQ
                    </button>
                  </li>
                </Link>

                <Link to={"/Pricing"}>
                  <li>
                    <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                      Pricing
                    </button>
                  </li>
                </Link>
                <Link to={"/About_us"}>
                  <li>
                    <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                      About us
                    </button>
                  </li>
                </Link>

                <li>
                  <button
                    className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80"
                    onClick={() =>
                      document
                        .getElementById("contact_section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Contanct
                  </button>
                </li>

                <Link to={"/Help"}>
                  <li>
                    <button className="text-white text-[13px] font-semibold nav_link cursor-pointer focus:text-white/80">
                      Help Center
                    </button>
                  </li>
                </Link>

                <Link
                  to={verifiedUser ? "/Dashboard" : "/Signin"}
                  onClick={handleGoogleUserVerified}
                >
                  <li className="cursor-pointer">
                    <PrimaryBtn btnSignin={btnSignin} />
                  </li>
                </Link>
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
              <Link to={"/Signup"}>
                <PrimaryBtn btnGetStarted={btnGetStarted} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full h-218.5 xl:min-h-screen overflow-hidden bg-[#000000]">
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
        <div className="absolute inset-0 w-full h-full bg-black/10 backdrop-blur-[120px] flex flex-col justify-center items-center">
          <div className="relative h-[80%] w-[80%]">
            <div className="absolute inset-0 flex w-full h-full flex-col items-center justify-center  ">
              <h1 className="text-2xl md:text-4xl leading-0.5 font-light text-white mb-18 md:mb-40 family-['Raleway']">
                Testimonials
              </h1>

              <div className="testimonial_cards flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center relative h-full md:h-auto">
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
        </div>
      </section>
      <section className="relative w-full h-218.5 xl:min-h-screen bg-white overflow-hidden">
        <div className="relative w-full h-full overflow-hidden bg-white">
          <div
            className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,#00FF9D33_34%,#0368FF33_92%)] pointer-events-none"
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
          <div className="relative mx-auto w-full h-full bg-white/10 backdrop-blur-[120px]">
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
        className="relative w-full h-218.5 xl:min-h-screen bg-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          zIndex: 20,
        }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover -z-1"
          src={proveBG}
        />
        <div className="absolute inset-0 h-full w-full flex justify-center items-center z-1">
          <div className="absolute inset-0 h-full w-[80%] mx-auto my-auto">
            <div className="prove absolute inset-0 w-full h-full object-contain flex flex-col justify-center md:justify-center lg:justify-center items-center p-20 z-999 gap-19.25">
              <h1 className="mt-20 w-[58vw] md:w-[45vw] h-fit text-[32px] md:text-[55px] font-black leading-tight md:leading-none text-transparent bg-clip-text bg-linear-to-r from-[#00FF9D] from-36% to-[#0368FF] to-95% z-10">
                Why choose Scheme manager pro?
              </h1>

              {/* pc view */}
              <div className="hidden min-[1164px]:block">
                <div
                  className="  flex items-center justify-center p-6 md:p-12 w-full min-h-[50vh] md:min-h-[80vh] bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${proveCard})`,
                    zIndex: 20,
                  }}
                >
                  <div className="relative flex items-center justify-center w-[95%] h-[75%]">
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
              <div className="min-[1164px]:hidden">
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
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#FF0033]/30 z-50"></div>
        </div>
      </section>
      <section
        className="relative w-full h-218.5 xl:min-h-screen bg-[#0E0019]/96 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${plan_BG_image})`,
          zIndex: 20,
        }}
      >
        {/* pc view */}
        <div className="hidden md:block">
          <div className="flex flex-col py-6 px-50">
            <div
              className="w-70 h-10 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${pcPlanTitle})`,
                zIndex: 30,
              }}
            ></div>
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
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Vote for management
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Limited number of schemes & members
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Get email notifications
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          No automation features
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          No backup storage
                        </p>
                      </div>
                    </div>

                    <div className="ml-auto">
                      <PrimaryBtn4
                        btnGetPlan={btnGetPlan}
                        onClick={() =>
                          navigate("/Checkout", { state: { planId: 1 } })
                        }
                      />
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
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Vote for management
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Get 10 schemes and 10 members
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Automated payments
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Fast human consultant response
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Build global public schemes to <br /> attract members
                          worldwide
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Download backup Files
                        </p>
                      </div>
                    </div>

                    <div className="ml-auto">
                      <PrimaryBtn4
                        btnGetPlan={btnGetPlan}
                        onClick={() =>
                          navigate("/Checkout", { state: { planId: 2 } })
                        }
                      />
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
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Vote for management
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Unlimited number of schemes & members
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Automation features
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Generating unlimited reports
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Monthly payment reminder
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Invite members via whatsApp
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="checkM h-3 w-3">
                          <img src={CheckMark} alt="-" />
                        </div>
                        <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                          Unlimited downloads
                        </p>
                      </div>
                    </div>

                    <div className="ml-auto">
                      <PrimaryBtn4
                        btnGetPlan={btnGetPlan}
                        onClick={() =>
                          navigate("/Checkout", { state: { planId: 3 } })
                        }
                      />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div className="md:hidden absolute inset-0 flex justify-center items-center">
          <div className="flex flex-col justify-evenly items-center h-[90%] w-[90%] gap-1">
            <div className="w-full">
              <img className="mx-auto" src={upgradePic} alt="title" />
            </div>

            <div className="flex flex-col justify-center w-full p-2.5 gap-5 bg-[#433653] rounded-[25px]">
              <h1 className="mx-auto fontRaleway family-['Raleway'] font-light tracking text-[28px] leading-8 bg-[linear-gradient(82.77deg,#AFAFAF_45.93%,#FFFFFF_69.57%)] bg-clip-text text-transparent flex-none order-0 grow-0">
                Flexible plans. <br />
                Zero commitment.
              </h1>
              <div className="flex flex-row justify-evenly">
                {plan_data.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => changePlan(plan.id)}
                    className={`fontRaleway family-['Raleway'] font-medium tracking text-[14px] bg-[#221635] text-white py-1.25 px-3.5 rounded-4xl border ${
                      activePlan === plan.id
                        ? "border-[#7C5CD3]"
                        : "border-transparent"
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="cardsContainer w-full h-100 flex flex-col justify-center items-center gap-8">
              {plan_data.map((plan) => (
                <div
                  key={plan.id}
                  className={`${activePlanCard === plan.id ? "block" : "hidden"} w-full h-full`}
                >
                  <div
                    className={`relative mx-auto group overflow-hidden w-full h-full rounded-[15px] ${
                      plan.id === 1
                        ? "flex flex-col justify-center items-center"
                        : "p-8 flex flex-col items-center"
                    } text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]`}
                  >
                    <div className="cursor-pointer absolute inset-0 z-20 overflow-hidden rounded-[15px]">
                      <div className="flex flex-col justify-evenly w-full h-full px-5 py-3">
                        <div className="w-full h-full flex flex-col">
                          <h4 className="planCardFont1 text-[#AFAFAF] text-[18px] family-['Rajdhani'] font-bold">
                            R {plan.price}/
                            <span className="text-[8px]">Month</span>
                          </h4>
                          <h1
                            className={`text-[34px] family-['Poppins'] font-black leading-7 pb-2 ${plan.titleGradient} bg-clip-text text-transparent h-fit`}
                          >
                            {plan.name} <br /> plan
                          </h1>
                          <p className="fontRaleway family-['Raleway'] font-thin tracking text-[10px] leading-3 text-[#e3e3e3]">
                            {plan.description}
                          </p>
                        </div>

                        <div className="flex flex-col h-full gap-2">
                          {plan.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex flex-row items-center gap-3"
                            >
                              <div className="checkM h-3 w-3">
                                <img src={CheckMark} alt="-" />
                              </div>
                              <p className="fontRaleway font-normal text-[9px] tracking-normal text-white">
                                {feature}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="ml-auto">
                          <PrimaryBtn4
                            btnGetPlan={btnGetPlan}
                            onClick={() =>
                              navigate("/Checkout", {
                                state: { planId: plan.id },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-[15%] h-6 bg-[#433653] rounded-4xl flex flex-row justify-center items-center gap-1">
                {plan_data.map((plan) => (
                  <span
                    key={plan.id}
                    onClick={() => changePlan(plan.id)}
                    className={`h-1.5 aspect-square rounded-4xl ${activePlanCardSpan === plan.id ? "bg-[#1B1227]" : "bg-[#908A9A]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact_section"
        className="relative w-full h-218.5 xl:min-h-screen bg-[#FFDDBF] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${call_bg})`,
          zIndex: 20,
        }}
      >
        <img
          className="absolute left-0 to-10 h-[90%]  aspect-video "
          src={linesCall}
        />
        <img
          className="md:hidden absolute -right-30 bottom-0 h-60 aspect-video z-30"
          src={cellMan}
          alt="Cellular man illustration"
        />
        <div className="relative  h-full p-15 md:p-0">
          <h1 className="text-left text-[36px] sm:text-[48px] md:text-[54px] leading-tight font-['Raleway'] font-normal text-[#F17A19] w-full max-w-89.5 md:mx-0 absolute top-[20%] md:top-7.5 left-[50%] -translate-x-1/2 md:left-29.5 md:translate-x-0">
            Get in touch <br /> with us
          </h1>
        </div>

        <div className="absolute inset-0 pt-37 items-center justify-start md:justify-center md:items-center md:p-20 w-full h-full flex">
          <div className="relative flex justify-center items-center mx-10 w-130 h-90 bg-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[10px] rounded-[15px]">
            <img
              className="hidden md:block fixed -right-75 -bottom-25 h-137.5 aspect-video z-90"
              src={cellMan}
              alt="Cellular man illustration"
            />
            <div className="h-[80%] w-[70%] flex flex-col gap-6 z-200">
              <div className="flex flex-col gap-4">
                <div className="field">
                  <span className="w-95.25 h-5.5 self-stretch font-['Rajdhani'] font-medium text-[16px] leading-[140%] text-[#F69649]">
                    Username
                  </span>
                  <input
                    type="text"
                    placeholder="J...@gmail.com"
                    className="flex flex-row items-center px-4 py-3 w-full min-w-30 h-10 bg-[#F2F2F2] outline-none focus:border focus:border-[#e68b13] rounded-lg self-stretch flex-none font-['Rajdhani'] text-base text-[#f77103] placeholder:text-[#F69649]/60 placeholder:font-['Rajdhani']"
                  />
                </div>
                <div className="field">
                  <span className="w-95.25 h-5.5 self-stretch font-['Rajdhani'] font-medium text-[16px] leading-[140%] text-[#F69649]">
                    Phone number
                  </span>
                  <input
                    type="text"
                    placeholder="0712345678"
                    className="flex flex-row items-center px-4 py-3 w-full min-w-30 h-10 bg-[#F2F2F2] outline-none focus:border focus:border-[#e68b13] rounded-lg self-stretch flex-none font-['Rajdhani'] text-base text-[#f77103] placeholder:text-[#F69649]/60 placeholder:font-['Rajdhani']"
                  />
                </div>
              </div>
              <button className="relative isolate flex flex-row justify-center items-center px-4.5 py-2  bg-[#F69649] shadow-[0_0_24px_rgba(168,85,247,0.2),0_0_18px_rgba(0,229,255,0.2)] rounded-full flex-none mx-auto text-white text-[13px] cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                Request Call
              </button>
              <div className="flex justify-center gap-10 z-999">
                <button className="h-6 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                  <img className="h-full w-full" src={InstagramV} alt="" />
                </button>
                <button className="h-6 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                  <img className="h-full w-full" src={FacebookV} alt="" />
                </button>
                <button className="h-6 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                  <img className="h-full w-full" src={WhatsAppV} alt="" />
                </button>
                <button className="h-6 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                  <img className="h-full w-full" src={TikTokV} alt="" />
                </button>
              </div>
              <div className="flex flex-row items-center justify-center w-full gap-4">
                <div className="flex-1 border-t border-[#F69649]"></div>
                <span className="text-xs font-['Raleway'] font-light text-[#F69649] whitespace-nowrap">
                  Chat with us
                </span>
                <div className="flex-1 border-t border-[#F69649]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="relative w-full h-218.5 xl:min-h-screen bg-[#FFDDBF] overflow-hidden bg-cover bg-center bg-no-repeat bg-(image:--bg-mobile) md:bg-(image:--bg-desktop) px-10"
        style={{
          "--bg-mobile": `url(${bg_info_mobile})`,
          "--bg-desktop": `url(${bg_info_desktop})`,
          zIndex: 20,
        }}
      >
        <img className="md:hidden mx-auto" src={m_hand} alt="" />
        <img className="hidden md:block mx-auto" src={p_hand} alt="" />
        <div className="absolute bottom-0 left-0 p-9 w-full flex flex-col gap-9.25 md:gap-16 md:items-end">
          <p className="font-['Poppins'] font-semibold text-xs leading-4.5 text-white md:text-right">
            Join 95,000+ scheme managers securing <br /> their financial future
            from the <br /> palm of their hand.
          </p>
          <div className="flex justify-center items-center gap-10 md:gap-18">
            <span className="inline-flex items-center gap-1.5 w-fit h-8.75 font-['Raleway'] font-normal text-xs leading-8.75 text-white flex-none order-0 grow-0 underline underline-offset-6 cursor-pointer group">
              <span className="tracking-wide">Choose how to manage</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>

            <button className="relative isolate flex flex-row justify-center items-center px-8 py-4  bg-[#325898] shadow-[0px_0px_24px_rgba(168,85,247,0.2),0px_0px_18px_rgba(0,229,255,0.2)] rounded-full flex-none mx-auto text-white text-[13px] cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90 font-bold tracking">
              Get Access
            </button>
          </div>
        </div>
      </section>
      <section
        className="relative w-full h-218.5 xl:min-h-screen bg-[#000000] overflow-hidden bg-cover bg-center bg-no-repeat bg-(image:--bg-mobile) md:bg-(image:--bg-desktop) px-10"
        style={{
          "--bg-mobile": `url(${BG_footer_m})`,
          "--bg-desktop": `url(${BG_footer_p})`,
          zIndex: 20,
        }}
      >
        <div className="mt-8.5 relative overflow-clip cursor-pointer">
          <img
            className="w-35 h-10 object-contain relative z-10 "
            src={logo}
            alt="Logo"
          />

          <div className="premiumShine pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[200%] -translate-x-full rounded-2xl group-hover:animate-shine" />
        </div>
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          {/* Inner card wrapper sized strictly to the image */}
          <div className="relative w-fit h-fit">
            {/* Mobile Card Image */}
            <img
              className="md:hidden block w-full h-auto"
              src={footer_card_m}
              alt="footer_p"
            />

            {/* Desktop Card Image */}
            <img
              className="hidden md:block w-full h-auto"
              src={footer_card_p}
              alt="footer_p"
            />

            {/* Text Overlay anchored to the card's edges */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col">
              <div className="relative ml-7.75 md:ml-0">
                <img className="md:hidden" src={m_grand_logo} alt="f_pic" />
                <img
                  className="hidden md:block"
                  src={p_2grand_logo}
                  alt="f_pic"
                />

                {/* mobile view */}
                <div className="md:hidden absolute -bottom-17 flex flex-col gap-2">
                  <Link to={"/Signup"}>
                    <div className="flex justify-between items-end w-full">
                      <span className="inline-flex items-center gap-1.5 w-fit h-8.75 font-['Raleway'] font-normal text-[8px] leading-8.75 text-white underline underline-offset-6 cursor-pointer group">
                        <span className="tracking-wide">Sign up</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </span>
                      <img
                        className="md:hidden block h-[clamp(90px,25vh,150px)]"
                        src={m_phoneHand}
                        alt="footer_p"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col">
                      <h3 className="font-['Raleway'] font-bold text-sm  text-white">
                        Quick links
                      </h3>
                      <ul className="flex flex-col gap-1.5 list-disc pl-5 marker:text-white">
                        <Link to={"/About_us"}>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                            About us
                          </li>
                        </Link>
                        <Link
                          to={
                            "https://tawk.to/chat/6af8d12f594d653c431702de/1k7dv29b4?layout=modern"
                          }
                        >
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                            Ask AI
                          </li>
                        </Link>

                        <Link to={"/FAQ"}>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                            FAQ
                          </li>
                        </Link>
                        <Link to={"/Pricing"}>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                            Pricing
                          </li>
                        </Link>
                      </ul>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-['Raleway'] font-bold text-sm  text-white">
                        Terms & Conditions
                      </h3>
                      <ul className="flex flex-col gap-1.5 list-disc pl-5 marker:text-white ">
                        <Link to={"/Terms_and_Conditions"}>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                            Terms and Conditions
                          </li>
                        </Link>

                        <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                          Legal
                        </li>
                        <li className="font-['Raleway'] font-thin text-[11px]  text-white">
                          Popia Acts
                        </li>
                        <li className="font-['Raleway'] font-thin text-[11px] text-white">
                          <Link to="/Privacy">Privacy policy</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* pc view */}
                <div className="hidden md:block">
                  <div className="absolute -bottom-2 left-10 flex flex-col gap-2">
                    <Link to="/Signup">
                      <div className="flex justify-between items-end">
                        <span className="inline-flex items-center gap-1.5 w-fit h-8.75 font-['Raleway'] font-normal text-xs leading-8.75 text-white underline underline-offset-6 cursor-pointer group pb-5">
                          <span className="tracking-wide">Sign up</span>
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </span>
                        <img
                          className="hidden md:block h-[clamp(90px,25vh,200px)]"
                          src={m_phoneHand}
                          alt="footer_p"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-row gap-15">
                      <div className="flex flex-col">
                        <h3 className="font-['Raleway'] font-bold text-sm  text-white">
                          Where to find us
                        </h3>
                        <ul className="flex flex-col gap-1.5 list-none pl-5 marker:text-white">
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                            Contacts +27 63 956 7719
                          </li>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                            ngubaneelten@gmail.com
                          </li>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white mt-3">
                            <div className="flex justify-center gap-10 z-999">
                              <button className="h-4 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                                <img
                                  className="h-full w-full"
                                  src={InstagramV}
                                  alt=""
                                />
                              </button>
                              <button className="h-4 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                                <img
                                  className="h-full w-full"
                                  src={FacebookV}
                                  alt=""
                                />
                              </button>
                              <button className="h-4 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                                <img
                                  className="h-full w-full"
                                  src={WhatsAppV}
                                  alt=""
                                />
                              </button>
                              <button className="h-4 aspect-auto cursor-pointer focus:scale-85 group transition-all duration-200 hover:scale-y-90">
                                <img
                                  className="h-full w-full"
                                  src={TikTokV}
                                  alt=""
                                />
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-['Raleway'] font-bold text-sm  text-white">
                          Quick links
                        </h3>
                        <ul className="flex flex-col gap-1.5 list-disc pl-5 marker:text-white">
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                            About us
                          </li>
                          <Link
                            to={
                              "https://tawk.to/chat/6af8d12f594d653c431702de/1k7dv29b4?layout=modern"
                            }
                          >
                            <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                              Ask AI
                            </li>
                          </Link>
                          <Link to={"/FAQ"}>
                            <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                              FAQ
                            </li>
                          </Link>
                          <Link to={"/Pricing"}>
                            <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                              Pricing
                            </li>
                          </Link>
                        </ul>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-['Raleway'] font-bold text-sm  text-white">
                          Terms & Conditions
                        </h3>
                        <ul className="flex flex-col gap-1.5 list-disc pl-5 marker:text-white ">
                          <Link to={"Terms_and_Conditions"}>
                            <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                              Terms and Conditions
                            </li>
                          </Link>

                          <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                            Legal
                          </li>
                          <li className="font-['Raleway'] font-thin text-[11px]  text-white nav_link cursor-pointer focus:text-white/80 w-fit">
                            Popia Acts
                          </li>
                          <li className="font-['Raleway'] font-thin text-[11px] text-white nav_link w-fit">
                            <Link to="/Privacy">Privacy policy</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="flex-1 mt-auto">
                        <img src={pc_payM_pics} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 gap-4 bottom-7 flex flex-col justify-center items-center w-full">
          <img className="md:hidden" src={m_payM_pic} alt="payments" />
          <p className=" text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
            Powered by Scheme Manager Pro® <br />
            ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
          </p>
        </div>
      </section>
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`fixed bottom-5 right-4 h-14 aspect-square bg-black rounded-4xl z-99 text-white flex items-center justify-center cursor-pointer hover:bg-neutral-800 hover:-translate-y-1 transition-[opacity,visibility,transform,background-color] duration-600 shadow-lg ${
          showScrollToTop
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      <HomeMobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </div>
  );
}

export default HomePage;
