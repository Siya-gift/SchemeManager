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

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                name="newPassword"
                autoComplete="new-password"
                required
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />

              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Confirm New Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                required
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />

              <div className="mt-4 flex justify-center">
                <PrimaryBtn5
                  type="submit"
                  disabled={loading}
                  text={loading ? "Updating..." : "Update Password"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
