import React, { useState } from "react";
import signbg from "../images/signbg.svg";
import signDesktopBg from "../images/signDesktopBg.svg";
import logo from "../images/logo_h.png";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrimaryBtn5 from "./PrimaryBtn5";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabaseClient.js";
import { useNavigate } from "react-router-dom";
import SignGoogleBtn from "./SignGoogleBtn.jsx";
import { completeEmailSignup } from "../lib/completeEmailSignup.js";

function Signup() {
  const btnSignup = "Sign up";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [strengthScore, setStrengthScore] = useState(0);
  const [passInfoModal, setpassInfoModal] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedEmail = username.trim();
    const trimmedPhone = phoneNumber.trim();
    const trimmedName = name.trim();

    if (trimmedEmail === "" || password === "" || trimmedName === "") {
      toast.error("All fields are required.");
      return;
    }

    if (confirmPassword === "") {
      toast.error("Confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (strengthScore !== 5) {
      toast.error("Match the required password.");
      return;
    }

    setLoading(true);

    try {
      // 1. Check if email already exists in auth.users via RPC
      const { data: emailExists, error: checkError } = await supabase.rpc(
        "check_email_exists",
        { email_input: trimmedEmail },
      );

      if (checkError) {
        toast.error(`Error verifying member status: ${checkError.message}`);
        return;
      }

      if (emailExists) {
        toast.error(
          "An account with this email already exists. Please log in.",
        );
        return;
      }

      // 2. Attempt Supabase Auth Sign Up
      const { data, error: authError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: trimmedName,
            phoneNumber: trimmedPhone,
            registration_source: "email_signup",
          },
        },
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      // 3. Backup check for existing email in Supabase Auth
      if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        toast.error(
          "An account with this email already exists. Please log in.",
        );
        return;
      }

      if (data.session && data.user) {
        await completeEmailSignup(data.user);
      }

      if (data.session) {
        toast.success("Account created! Redirecting...");
        navigate("/Dashboard");
      } else {
        toast.success(
          "Verification email sent. Your account will be set up after you verify your email.",
        );
        navigate("/Confirm_Email", {
          state: { email: trimmedEmail, name: trimmedName },
        });
      }
    } catch (signupError) {
      const message =
        signupError instanceof Error
          ? signupError.message
          : "An unexpected error occurred during signup.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not start Google registration. Please try again.";
      setError(message);
      console.log(message);
      
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Place this map outside your component
  const STRENGTH_WIDTHS = {
    0: "after:w-0",
    1: "after:w-1/5",
    2: "after:w-2/5",
    3: "after:w-3/5",
    4: "after:w-4/5",
    5: "after:w-full",
  };

  const handlePasswordValidation = (value) => {
    setPassword(value);

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
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="bg-[#1E1E1E]">
      <div className="relative flex justify-center items-center min-h-208 md:h-300 w-screen md:w-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(3,104,255,0.2)_-29.42deg,rgba(0,255,157,0.3)_122.88deg,rgba(3,104,255,0.2)_330.58deg,rgba(0,255,157,0.3)_482.88deg)]">
        {" "}
        <img
          className="w-35 h-10 absolute top-4 left-2 object-contain  z-10 "
          src={logo}
          alt="Logo"
        />
        <div className=" absolute inset-0 rounded-2xl [anchor-name:--signfooter]">
          <img
            src={signbg}
            alt="Sign Background"
            className="md:hidden absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={signDesktopBg}
            alt="Sign Background"
            className="hidden md:block absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <p className="absolute bottom-[anchor(--signfooter_bottom)] left-[anchor(--signfooter_left)] -translate-y-8 w-full text-center font-['Rajdhani'] text-[12px] text-white/70">
          Powered by Scheme Manager Pro
        </p>
        <div className=" h-[70%] md:h-[67%]  flex flex-col md:-translate-y-10 justify-center items-center gap-4 md:gap-8 w-[80%] md:w-[50%] z-10">
          <div className="flex w-full  flex-row justify-left items-center gap-8">
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
              Welcome, <br /> please{" "}
              <span className="bg-linear-to-r from-[#00FF9D] from-[35.58%] to-[#0368FF] to-[94.71%] bg-clip-text text-transparent font-thin">
                Sign up Here
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full h-full z-999">
            <form className="flex flex-col gap-4 w-[90%] mt-4">
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Johnson"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="0612345678"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Username
              </label>
              <input
                type="email"
                placeholder="J...@gmail.com"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* Drop-in JSX matching your exact classes and fonts */}
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Password
              </label>
              <div
                className={`relative pb-3 before:absolute before:bottom-0 before:left-0 before:h-2 before:w-full before:rounded-full before:bg-white after:absolute after:bottom-0 after:left-0 after:h-2 after:rounded-full after:bg-linear-to-r after:from-[#3bdd9f]/60 after:to-[#411066]/50 after:transition-all after:duration-300 ${STRENGTH_WIDTHS[strengthScore]}`}
              >
                <input
                  type="password"
                  placeholder="• • • • • • • • •"
                  className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
                  value={password}
                  onChange={(e) => handlePasswordValidation(e.target.value)}
                  onFocus={() => setpassInfoModal(true)}
                  onBlur={() => setpassInfoModal(false)}
                />
              </div>

              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="• • • • • • • • •"
                className={`h-10 bg-[#F2F2F2] border placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani'] outline-none transition-colors ${
                  passwordsMismatch
                    ? "border-red-500 ring-2 ring-red-500/40"
                    : passwordsMatch
                      ? "border-[#168616] ring-2 ring-[#168616]/40"
                      : "border-[#D9D9D9]"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="flex flex-col flex-end">
                <div className="flex justify-center items-center gap-2">
                  <div className="p-px bg-linear-to-r from-[#0368FF] to-[#00FF9D] rounded-sm">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      className="w-3.5 h-3.5 bg-[#F2F2F2] checked:bg-transparent rounded-[3px] border-none appearance-none checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat bg-size-[10px_10px] cursor-pointer block"
                    />
                  </div>

                  <label
                    className="font-['Rajdhani'] font-thin text-[12px] text-[#FFFFFF]"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <SignGoogleBtn
                  onClick={handleGoogleSignup}
                  text="Signup with Google"
                />

                <div className="mt-2 flex justify-between items-center w-[110%]">
                  <p className="font-['Rajdhani'] font-thin text-[11px] text-white">
                    Already have an account?{" "}
                    <Link
                      to="/Signin"
                      className="underline font-thin hover:text-gray-200"
                    >
                      Sign in
                    </Link>
                  </p>
                  <PrimaryBtn5
                    type="submit"
                    onClick={handleSignup}
                    btnSignup={btnSignup}
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {passInfoModal && (
          <div
            className={`fixed left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out mx-auto w-90 p-10 z-9999 border glass text-white ${
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
        {/* Keep the modal in the DOM, but toggle its visibility classes */}
      </div>
    </div>
  );
}

export default Signup;
