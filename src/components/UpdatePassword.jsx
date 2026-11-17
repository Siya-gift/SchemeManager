import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabaseClient.js";
import loginSMbg from "../images/loginSMbg.svg";
import loginMDbg from "../images/loginMDbg.svg";
import logo from "../images/logo_h.png";
import PrimaryBtn5 from "./PrimaryBtn5";

function UpdatePassword() {
  const navigate = useNavigate();
  const upadatePassword = "Save"

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [strengthScore, setStrengthScore] = useState(0);
  const [passInfoModal, setpassInfoModal] = useState(false);
  const [error, setError] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully!");
      navigate("/Dashboard", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update password. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const STRENGTH_WIDTHS = {
    0: "after:w-0",
    1: "after:w-1/5",
    2: "after:w-2/5",
    3: "after:w-3/5",
    4: "after:w-4/5",
    5: "after:w-full",
  };

  const handlePasswordValidation = (value) => {
    setNewPassword(value);

    if (!value) {
      setStrengthScore(0);
      setpassInfoModal(true);
      return;
    }

    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[a-z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    setpassInfoModal(false);
    setStrengthScore(score);
  };

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  // toggle based on whether password has input or modal is focused
  const progressBarOpacity =
    newPassword.length > 0
      ? "before:opacity-100 after:opacity-100"
      : "before:opacity-0 after:opacity-0";

  return (
    <div className="bg-[#1E1E1E]">
      <div className="relative flex justify-center items-center min-h-208 md:h-300 w-screen md:w-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(3,104,255,0.2)_-29.42deg,rgba(0,255,157,0.3)_122.88deg,rgba(3,104,255,0.2)_330.58deg,rgba(0,255,157,0.3)_482.88deg)]">
        <img
          className="w-35 h-10 absolute top-4 left-2 object-contain z-10"
          src={logo}
          alt="Logo"
        />

        <div className="absolute inset-0 rounded-2xl [anchor-name:--signfooter]">
          <img
            src={loginSMbg}
            alt="Background"
            className="md:hidden absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={loginMDbg}
            alt="Background"
            className="hidden md:block absolute inset-0 w-full h-full md:h-[70%] object-contain"
          />
        </div>

        <p className="absolute bottom-[anchor(--signfooter_bottom)] left-[anchor(--signfooter_left)] -translate-y-8 w-full text-center font-['Rajdhani'] text-[12px] text-white/70">
          Powered by Scheme Manager Pro
        </p>

        <div className="h-[70%] md:h-[67%] flex flex-col md:-translate-y-10 justify-center items-center gap-4 md:gap-8 w-[80%] md:w-[50%] z-10">
          <div className="flex w-full flex-row justify-start items-center gap-8">
            <Link
              to="/"
              className="group z-10 items-center text-white gap-1 inline-flex cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
              <span className="font-['Rajdhani'] font-normal text-[16px] leading-5 text-white">
                Back
              </span>
            </Link>

            <div className="font-['Rajdhani'] font-thin text-[20px] leading-6 text-white">
              Reset your <br />
              <span className="bg-linear-to-r from-[#00FF9D] from-[35.58%] to-[#0368FF] to-[94.71%] bg-clip-text text-transparent font-thin">
                Password
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full h-full z-999">
            <form
              className="flex flex-col gap-4 w-[90%] mt-4"
              onSubmit={handleUpdatePassword}
            >
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                New Password
              </label>
              <div
                className={`relative pb-3 
                before:absolute before:bottom-0 before:left-0 before:h-2 before:w-full before:rounded-full before:bg-white before:transition-opacity before:duration-300 
                after:absolute after:bottom-0 after:left-0 after:h-2 after:rounded-full after:bg-linear-to-r after:from-[#3bdd9f]/60 after:to-[#411066]/50 after:transition-all after:duration-300 
                ${progressBarOpacity} ${STRENGTH_WIDTHS[strengthScore]}`}
              >
                <input
                  type="password"
                  placeholder="• • • • • • • • •"
                  className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
                  value={newPassword}
                  onChange={(e) => handlePasswordValidation(e.target.value)}
                  onFocus={() => setpassInfoModal(true)}
                  onBlur={() => setpassInfoModal(false)}
                />
              </div>

              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Confirm New Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="• • • • • • • • •"
                className={`h-10 bg-[#F2F2F2] border placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani'] outline-none transition-colors ${
                  passwordsMismatch
                    ? "border-red-500 ring-2 ring-red-500/40"
                    : passwordsMatch
                      ? "border-[#168616] ring-2 ring-[#168616]/40"
                      : "border-[#D9D9D9]"
                }`}
              />

              <div className="mt-4 flex justify-center">
                <PrimaryBtn5
                  type="submit"
                  disabled={loading}
                btnSignup={upadatePassword}
                />
              </div>
            </form>
          </div>
        </div>
        {passInfoModal && (
          <div
            className={`fixed left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out mx-auto w-90 p-10 z-9999 border border-white/15 bg-gray-700 rounded-4xl shadow-xl text-white ${
              passInfoModal
                ? "top-5 opacity-100 scale-100 pointer-events-auto"
                : "-top-96 opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="relative w-full h-full">
              <div
                className="absolute -top-7 -right-4 mt-auto text-[22px] cursor-pointer hover:-translate-y-1 transition-all duration-150"
                onClick={() => setpassInfoModal(false)}
              >
                &times;
              </div>
              <div className="flex flex-row gap-3">
                <i className="fa-solid fa-lock text-[34px]"></i>
                <h3 className="mt-auto text-[18px]">Required password info</h3>
              </div>

              <div className="mt-8">
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-3 items-center">
                    <span className="text-green-400">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="text-white">Require 8 characters</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-green-400">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="text-white">
                      At least one uppercase letter
                    </span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-green-400">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="text-white">
                      At least one lowercase letter
                    </span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-green-400">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="text-white">At least one number</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-green-400">
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span className="text-white">
                      At least one special character
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdatePassword;
