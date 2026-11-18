import { useState } from "react";
import pcPlanTitle from "../images/pcPlanTitle.svg";
import CheckMark from "../images/CheckMark.svg";
import PrimaryBtn4 from "./PrimaryBtn4";
import upgradePic from "../images/upgradePic.svg";
import { Link, useNavigate } from "react-router-dom";
import { plan_data } from "../lib/planData.js";

function PlanCard({
  plan,
  btnGetPlan,
  onCheckout,
  isMobile = false,
  isActive = true,
}) {
  const outerClass = isMobile
    ? `${isActive ? "block" : "hidden"} w-full h-full`
    : "relative isolate group overflow-hidden w-60 h-100 rounded-[15px] p-8 flex flex-col items-center text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]";
  const cardClass = isMobile
    ? `relative mx-auto group overflow-hidden w-full h-full rounded-[15px] ${
        plan.id === 1
          ? "flex flex-col justify-center items-center"
          : "p-8 flex flex-col items-center"
      } text-white font-sans bg-linear-to-b from-black/20 to-black/20 bg-black/10 shadow-[0px_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[125px]`
    : "";

  const cardContent = (
    <div className="cursor-pointer absolute inset-0 z-20 overflow-hidden rounded-[15px]">
      <div className="flex flex-col justify-evenly w-full h-full px-5 py-3">
        <div className="w-full h-full flex flex-col">
          <h4 className="planCardFont1 text-[#AFAFAF] text-[18px] family-['Rajdhani'] font-bold">
            R {plan.price}/<span className="text-[8px]">Month</span>
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
            <div key={feature} className="flex flex-row items-center gap-3">
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
          <PrimaryBtn4 btnGetPlan={btnGetPlan} onClick={onCheckout} />
        </div>
      </div>

      <div className="absolute inset-y-0 -left-10 w-[60%] translate-x-[-150%] skew-x-[-25deg] bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
    </div>
  );

  if (isMobile) {
    return (
      <div className={outerClass}>
        <div className={cardClass}>{cardContent}</div>
      </div>
    );
  }

  return <div className={outerClass}>{cardContent}</div>;
}

function Pricing() {
  const btnGetPlan = "Get Plan";
  const navigate = useNavigate();

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
            {plan_data.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                btnGetPlan={btnGetPlan}
                onCheckout={() =>
                  navigate("/Checkout", { state: { planId: plan.id } })
                }
              />
            ))}
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
              <PlanCard
                key={plan.id}
                plan={plan}
                btnGetPlan={btnGetPlan}
                isMobile
                isActive={activePlanCard === plan.id}
                onCheckout={() =>
                  navigate("/Checkout", { state: { planId: plan.id } })
                }
              />
            ))}
            <div className="w-[15%] h-6 bg-[#433653] rounded-4xl flex flex-row justify-center items-center gap-1">
              {plan_data.map((plan) => (
                <span
                  key={plan.id}
                  onClick={() => changePlan(plan.id)}
                  className={`h-1.5 aspect-square rounded-4xl ${
                    activePlanCardSpan === plan.id
                      ? "bg-[#1B1227]"
                      : "bg-[#908A9A]"
                  }`}
                />
              ))}
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
