import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import c_email_pic from "../images/c_email_pic.svg";
import logo from "../images/logoSvg.svg";
import { supabase } from "../lib/supabaseClient.js";

function Confirm_Email() {
  const { state } = useLocation();
  const [isSending, setIsSending] = useState(false);
  const email = state?.email ?? "";
  const name = state?.name?.trim() || "there";

  const resendVerificationEmail = async () => {
    if (!email || isSending) return;

    setIsSending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("A new verification email has been sent.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not resend the verification email. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[#1E1E1E]">
      <div className="relative flex justify-center items-center min-h-screen w-full bg-white p-10">
        <img
          className="w-35 h-10 absolute top-4 left-2 object-contain z-10"
          src={logo}
          alt="Logo"
        />
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <img className="w-40" src={c_email_pic} alt="" aria-hidden="true" />
            <h1 className="text-[24px] font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#00FF9D] from-36% to-[#0368FF] to-95%">
              Hi, {name}!
            </h1>
            <h3 className="text-black">Welcome to Scheme Manager Pro</h3>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center text-center">
            <p className="w-full max-w-125 text-sm text-black">
              We sent a verification link to{" "}
              <strong>{email || "your email address"}</strong>. Open the email
              and follow the link to verify your account.
            </p>
            <div className="inline-block rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 p-0.5">
              <button
                type="button"
                className="flex justify-center items-center rounded-full bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-[#3A3A3A] disabled:cursor-not-allowed disabled:opacity-60"
                onClick={resendVerificationEmail}
                disabled={!email || isSending}
              >
                {isSending ? "Sending..." : "Resend verification email"}
              </button>
            </div>
            <Link
              to="/Signin"
              className="text-sm text-[#0368FF] underline hover:text-[#034db8]"
            >
              Return to sign in
            </Link>
          </div>
        </div>
        <div className="absolute bottom-7 mx-auto flex w-full flex-col items-center justify-center">
          <p className="text-center font-['Rajdhani'] text-xs font-normal leading-3.75 text-black">
            Powered by Scheme Manager Pro® <br />
            ©Copyright 2026 Scheme Manager pro (PTY) Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Confirm_Email;
