import { useState } from "react";
import pcPlanTitle from "../images/pcPlanTitle.svg";
import CheckMark from "../images/CheckMark.svg";
import PrimaryBtn4 from "./PrimaryBtn4";
import upgradePic from "../images/upgradePic.svg";
import { Link } from "react-router-dom";

function Pricing() {
  const btnGetPlan = "Get Plan";

  const [activePlan, setActivePlan] = useState(1);
  const [activePlanCard, setActivePlanCard] = useState(1);
  const [activePlanCardSpan, setActivePlanCardSpan] = useState(1);

  const changePlan = (id) => {
    setActivePlan(id);
    setActivePlanCard(id);
    setActivePlanCardSpan(id);
  };
  return (
    <div className="relative w-full min-h-250 overflow-y-auto bg-linear-to-b from-[#048553] to-[#0E0019]/96 to-20%">
      {/* pc view */}
      <div className="hidden md:block">
        <div className="absolute group z-999 items-center text-white gap-1 inline-flex cursor-pointer w-full p-5">
          <Link to={"/"}>
            <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
            <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
              Back
            </span>
          </Link>
        </div>
        <div className="flex flex-col py-6 px-50">
          <p className="mx-auto family-['Poppins'] font-bold tracking text-[36px] leading-8 text-transparent bg-clip-text bg-linear-to-b from-[#00FF9D] from-6% to-[#0368FF] to-95% w-[90%] py-10">
            Affordable, streamlined
            <br /> schemes management.
          </p>
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
                    <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                  </div>
                </div>

                <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="md:hidden absolute inset-0 flex flex-col justify-center items-center">
        <Link
          to={"/"}
          className="group z-10 items-center text-white gap-1 inline-flex cursor-pointer w-full p-5"
        >
          <div>
            <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
            <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
              Back
            </span>
          </div>
        </Link>

        <div className="mx-auto family-['Poppins'] font-bold tracking text-[28px] leading-8 text-transparent bg-clip-text bg-linear-to-r from-[#00FF9D] from-36% to-[#0368FF] to-95% w-[90%] py-10">
          <p className="w-full">Affordable, streamlined schemes management.</p>
        </div>
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
              <button
                onClick={() => changePlan(1)}
                className={`fontRaleway family-['Raleway'] font-medium tracking text-[14px] bg-[#221635] text-white py-1.25 px-3.5 rounded-4xl border ${
                  activePlan === 1 ? "border-[#7C5CD3]" : "border-transparent"
                }`}
              >
                Starter
              </button>

              <button
                onClick={() => changePlan(2)}
                className={`fontRaleway family-['Raleway'] font-medium tracking text-[14px] bg-[#221635] text-white py-1.25 px-3.5 rounded-4xl border ${
                  activePlan === 2 ? "border-[#7C5CD3]" : "border-transparent"
                }`}
              >
                Standard
              </button>

              <button
                onClick={() => changePlan(3)}
                className={`fontRaleway family-['Raleway'] font-medium tracking text-[14px] bg-[#221635] text-white py-1.25 px-3.5 rounded-4xl border ${
                  activePlan === 3 ? "border-[#7C5CD3]" : "border-transparent"
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          <div className=" cardsContainer w-full h-100 flex flex-col justify-center items-center gap-8">
            {/* c1 */}
            <div
              className={`${activePlanCard === 1 ? "block" : "hidden"} w-full h-full`}
            >
              <div className="relative mx-auto group overflow-hidden w-full h-full rounded-[15px]  flex flex-col justify-center items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]">
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
                      <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
                </div>
              </div>
            </div>

            {/* c2 */}
            <div
              className={`${activePlanCard === 2 ? "block" : "hidden"} w-full h-full`}
            >
              <div className="relative mx-auto group overflow-hidden w-full h-full rounded-[15px] p-8 flex flex-col items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]">
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
                      <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
                </div>
              </div>
            </div>

            {/* c3 */}
            <div
              className={`${activePlanCard === 3 ? "block" : "hidden"} w-full h-full`}
            >
              <div className="relative mx-auto group overflow-hidden w-full h-full rounded-[15px] p-8 flex flex-col items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]">
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
                      <PrimaryBtn4 btnGetPlan={btnGetPlan} />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
                </div>
              </div>
            </div>

            <div className="w-[15%] h-6 bg-[#433653] rounded-4xl flex flex-row justify-center items-center gap-1">
              <span
                onClick={() => changePlan(1)}
                className={`h-1.5 aspect-square rounded-4xl ${activePlanCardSpan === 1 ? "bg-[#1B1227]" : "bg-[#908A9A]"}`}
              ></span>
              <span
                onClick={() => changePlan(2)}
                className={`h-1.5 aspect-square rounded-4xl ${activePlanCardSpan === 2 ? "bg-[#1B1227]" : "bg-[#908A9A]"}`}
              ></span>
              <span
                onClick={() => changePlan(3)}
                className={`h-1.5 aspect-square rounded-4xl ${activePlanCardSpan === 3 ? "bg-[#1B1227]" : "bg-[#908A9A]"}`}
              ></span>
            </div>
          </div>
        </div>

        <div className="flex-col justify-center items-center w-full mb-7">
          <p className=" text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
            Powered by Scheme Manager Pro® <br />
            ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="absolute left-1/2 -translate-x-1/2 gap-4 bottom-7 flex flex-col justify-center items-center w-full">
          <p className=" text-center font-['Rajdhani'] font-normal text-xs leading-3.75 text-white">
            Powered by Scheme Manager Pro® <br />
            ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
