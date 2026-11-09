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

function Signup() {
  const btnSignup = "Sign up";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedEmail = username.trim();
    const trimmedPhone = phoneNumber.trim();
    const trimmedName = name.trim();

    if (trimmedEmail === "" || password === "" || trimmedName === "") {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: trimmedName,
            phoneNumber: trimmedPhone,
          },
        },
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      if (data.user) {
        // 1. Insert into the main Members table
        const { error: dbError } = await supabase.from("Members").insert({
          id: data.user.id,
          member_name: trimmedName,
          tot_paid: "0.00",
          status: "Pending",
          scheme_name: ["clubs"],
        });

        if (dbError) {
          toast.error(
            `Account created, but saving the member profile failed: ${dbError.message}`,
          );
          console.log("Error inserting into Members table:", dbError);
          return;
        }

        // 2. Insert the default scheme record into the member_schemes table
        const { error: schemeError } = await supabase
          .from("members_schemes")
          .insert({
            user_id: data.user.id,
            scheme: "clubs", // Default starting scheme
            monthly_contribution: 0, // Set your default amount
            starting_bal: 0, // Initial starting balance
            created_at: new Date().toISOString(),
          });

        if (schemeError) {
          toast.error(
            `Account created, but setting up the default scheme failed: ${schemeError.message}`,
          );
          console.log(
            "Error inserting into member_schemes table:",
            schemeError,
          );
          return;
        }
      }

      if (data.session) {
        toast.success("Account created! Redirecting...");
        navigate("/Dashboard");
      } else {
        toast.success(
          "Registration successful! Please check your email to verify your account.",
        );
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
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
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
                <SignGoogleBtn onClick={handleGoogleSignup} text="Signup with Google"/>

                <div className="mt-4 flex justify-between items-center w-[110%]">
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
      </div>
    </div>
  );
}

export default Signup;
