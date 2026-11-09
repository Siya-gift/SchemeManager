import React from "react";
import { useState } from "react";
import loginSMbg from "../images/loginSMbg.svg";
import loginMDbg from "../images/loginMDbg.svg";
import logo from "../images/logo_h.png";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrimaryBtn5 from "./PrimaryBtn5";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabaseClient.js";
import { useNavigate } from "react-router-dom";
import SignGoogleBtn from "./SignGoogleBtn.jsx";

function Signin() {

  
  const btnSignin = "Sign in";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Email and password cannot be empty");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      toast.error(error.message);
      return;
    }

    
    if (data?.user) {
      setUser(data.user);
      toast.success("Signed in successfully!");
      
      
      navigate("/Dashboard", { replace: true }); 
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
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
      const message = error instanceof Error
        ? error.message
        : "Could not start Google sign-in. Please try again.";
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
            src={loginSMbg}
            alt="Sign Background"
            className="md:hidden absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={loginMDbg}
            alt="Sign Background"
            className="hidden md:block absolute inset-0 w-full h-full md:h-[70%] object-contain"
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
                Sign in
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full h-full z-999">
            <form className="flex flex-col gap-4 w-[90%] mt-4">
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="email"
                placeholder="J...@gmail.com"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Rajdhani'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
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
                <SignGoogleBtn onClick={handleGoogleSignin} text="Continue with Google" />

                <div className="mt-4 flex justify-between items-center w-[110%]">
                  <p className="font-['Rajdhani'] font-thin text-[11px] text-white">
                    Don't have an account?{" "}
                    <Link
                      to="/Signup"
                      className="underline font-thin hover:text-gray-200"
                    >
                      Sign up
                    </Link>
                  </p>
                  <PrimaryBtn5
                    type="submit"
                    onClick={handleSignin}
                    btnSignup={btnSignin}
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

export default Signin;
