import React from "react";
import { useState } from "react";
import loginSMbg from "../images/loginSMbg.svg";
import loginMDbg from "../images/loginMDbg.svg";
import logo from "../images/logo_h.png";
import { Link } from "react-router-dom";
import PrimaryBtn5 from "./PrimaryBtn5";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabaseClient.js";
import { useNavigate } from "react-router-dom";

const REMEMBERED_EMAIL_KEY = "schememanager-remembered-email";

function UpdatePassword() {
  const btnSignin = "Sign in";
  const navigate = useNavigate();

  const [username, setUsername] = useState(
    () => localStorage.getItem(REMEMBERED_EMAIL_KEY) || "",
  );
  const [rememberEmail, setRememberEmail] = useState(() =>
    Boolean(localStorage.getItem(REMEMBERED_EMAIL_KEY)),
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    const trimmedEmail = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Email and password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        if (rememberEmail) {
          localStorage.setItem(REMEMBERED_EMAIL_KEY, trimmedEmail);
        } else {
          localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
        toast.success("Signed in successfully!");
        navigate("/Dashboard", { replace: true });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (signinError) {
      const message =
        signinError instanceof Error
          ? signinError.message
          : "Unable to sign in. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not start Google sign-in. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      toast('Please enter your email address first.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/UpdatePassword`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast('Password reset email sent! Check your inbox.');
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
            <form
              className="flex flex-col gap-4 w-[90%] mt-4"
              onSubmit={handleSignin}
            >
              <label className="font-['Rajdhani'] font-thin text-[16px] leading-2 text-white">
                Email
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="email"
                name="email"
                autoComplete="username"
                required
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
                name="password"
                autoComplete="current-password"
                required
                placeholder="• • • • • • • • •"
                className="h-10 bg-[#F2F2F2] border border-[#D9D9D9] placeholder:font-['Poppins'] rounded-lg px-3 py-2 w-full text-slate-600 text-[14px] font-['Rajdhani']"
              />

              <div className="flex flex-col flex-end">
                <div className="flex justify-center items-center gap-2">
                  <div className="p-px bg-linear-to-r from-[#0368FF] to-[#00FF9D] rounded-sm">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberEmail}
                      onChange={(e) => setRememberEmail(e.target.checked)}
                      className="w-3.5 h-3.5 bg-[#F2F2F2] checked:bg-transparent rounded-[3px] border-none appearance-none checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat bg-size-[10px_10px] cursor-pointer block"
                    />
                  </div>

                  <div className="flex gap-6 justify-start">
                    <label
                      className="font-['Rajdhani'] font-thin text-[12px] text-[#FFFFFF]"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                    <label
                      className="font-['Rajdhani'] font-thin text-[12px] text-[#FFFFFF] underline hover:text-blue-100 hover:translate-y-[-0.8px] transition-all duration-200 cursor-pointer" onClick={handleForgotPassword}
                    >
                      Forgot password
                    </label>
                  </div>
                </div>
                <SignGoogleBtn
                  onClick={handleGoogleSignin}
                  text="Continue with Google"
                />

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

export default UpdatePassword;
