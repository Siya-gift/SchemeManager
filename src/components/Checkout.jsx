import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryBtn6 from "./PrimaryBtn6";

function Checkout() {
  const btnCheckout = "Checkout";
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
  };
  return (
    <div className="w-full min-h-screen overflow-y-auto bg-[#0E0019]/96 px-5 py-8 sm:px-10">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="group inline-flex items-center gap-1 text-white"
        >
          <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
          <span className="font-['Rajdhani'] text-[16px] leading-5">Back</span>
        </Link>
        <Link to="/Help" className="inline-flex items-center gap-1 text-white">
          <span className="font-['Rajdhani'] text-[16px] leading-5 underline underline-offset-4">
            Need Help?
          </span>
        </Link>
      </div>
      <div className="flex flex-col items-center py-11 gap-3.5">
        <div className="flex items-center justify-between w-full px-3">
          <p className="text-md text-white font-['Raleway'] not-italic font-nomarl text-base">
            Choose Plan
          </p>
          <p className="text-md text-white font-['Raleway'] not-italic font-thin text-base">
            Checkout
          </p>
          <p className="text-md text-white font-['Raleway'] not-italic font-thin text-base">
            Complete
          </p>
        </div>
        <div className="flex items-center gap-3 justify-center w-full px-8">
          <div className="bg-[#C9ADFF] h-11.75 aspect-square rounded-[20px] flex items-center justify-center">
            <p className="text-md text-[#0E0019] font-['Raleway'] not-italic font-nomarl">
              1
            </p>
          </div>
          <div className="h-0.5 bg-[#433653] w-full rounded-2xl"></div>
          <div className="bg-[#433653] h-11.75 aspect-square rounded-[20px] flex items-center justify-center">
            <p className="text-md text-[#BFB5CD] font-['Raleway'] not-italic font-nomarl">
              2
            </p>
          </div>
          <div className="h-0.5 bg-[#433653] w-full rounded-2xl"></div>
          <div className="bg-[#433653] h-11.75 aspect-square rounded-[20px] flex items-center justify-center">
            <p className="text-md text-[#BFB5CD] font-['Raleway'] not-italic font-nomarl">
              3
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-[15px] bg-linear-to-r from-[#00FF9D]/36 to-[#0368FF]/95 p-0.5">
        <div className="flex justify-center flex-col rounded-[15px] bg-[#221436] px-5.5 py-3.5 gap-4">
          <div className="flex flex-col">
            <h4 className="text-[#AFAFAF] text-[18px] family-['Rajdhani'] font-bold">
              R 149/<span className="text-[8px]">Month</span>
            </h4>
            <h1
              className={`text-[34px] family-['Poppins'] font-black leading-7 pb-2 bg-linear-to-r from-[#D900FF] from-[8.17%] via-[#6C73FF]/45 via-[74.52%] to-[#00E9FF]/20 to-[87.98%] bg-clip-text text-transparent h-fit`}
            >
              Starter <br /> plan
            </h1>
            <p className="fontRaleway family-['Raleway'] font-thin tracking text-[12px] leading-3 text-[#e3e3e3] max-w-50">
              Get started by using this plan and get the basic and useful
              features.
            </p>
          </div>

          <div className="w-full flex flex-col gap-0.5 ">
            <div className=" w-full rounded-tl-[15px] rounded-tr-[15px] bg-[#000000]/40 px-3 py-5">
              <div className="flex justify-between">
                <p className="text-white text-[14px] family-['Rajdhani'] font-semibold">
                  Starter Plan
                </p>
                <p className="text-white text-[14px] family-['Rajdhani'] font-semibold">
                  R 149,99
                </p>
              </div>
              <p className="fontRaleway family-['Raleway'] font-thin tracking text-[12px] leading-3 text-[#e3e3e3] mt-0.75">
                Billed monthly
              </p>
            </div>
            <div className=" w-full rounded-bl-[15px] rounded-br-[15px] bg-[#000000]/30 shadow-md shadow-black/50 px-3 py-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-2.5 items-center">
                  <label className="items-center cursor-pointer select-none">
                    <input type="checkbox" className="sr-only peer" />
                    <div
                      className="relative w-9 h-5 bg-transparent rounded-full peer ring-1 ring-white peer-focus:ring-1 peer-focus:ring-white/50 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] 
                    after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white/90 after:rounded-full 
                    after:h-4 after:w-4 after:transition-all after:duration-300 peer-checked:bg-white/50"
                    ></div>
                  </label>
                  <div className="bg-white rounded-[5px] h-5.5 px-3 grid items-center">
                    <p className="text-[11px] family-['Rajdhani'] font-semibold text-[#000000]">
                      Save R500
                    </p>
                  </div>
                  <p className="text-[8px] family-['Rajdhani'] font-semibold text-white">
                    with annual billing
                  </p>
                </div>
                <p className="text-[11px] family-['Rajdhani'] font-semibold text-white">
                  R 1299,99
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-[14px] font-['Raleway'] font-normal text-white">
                  Subtotal
                </p>
                <p className="text-[14px] font-['Raleway'] font-normal text-white">
                  R 149,99
                </p>
              </div>
              <div className="h-0.5 w-full bg-white/10"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-[14px] font-['Raleway'] font-normal text-white">
                  Discount
                </p>
                <p className="text-[14px] font-['Raleway'] font-normal text-white">
                  R 0,00
                </p>
              </div>
              <div className="h-0.5 w-full bg-white/10"></div>
            </div>
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex justify-between items-center">
                <p className="text-[14px] font-['Raleway'] font-normal text-white">
                  Total
                </p>
                <p className="text-[14px] font-['Raleway'] font-normal text-white">
                  R 149,99
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <PrimaryBtn6
              type={"button"}
              onClick={handleCheckout}
              btnCheckout={btnCheckout}
              disabled={loading}
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <p className="text-center font-['Rajdhani'] text-xs font-normal leading-3.75 text-white mt-auto">
          Powered by Scheme Manager Pro® <br />
          <Link to={"/Privacy"}>
            <span className="underline">Privacy</span>
          </Link>{" "}
          and{" "}
          <Link to={"/Terms_and_Conditions"}>
            <span className="underline">Terms & Conditions</span>
          </Link>{" "}
          are applied
        </p>
      </div>
    </div>
  );
}

export default Checkout;
