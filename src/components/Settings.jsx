import RestoreButton from "./UploadJsonData.jsx";
import { supabase } from "../lib/supabaseClient.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ShareButton from "./ShareButton.jsx";
import { useEffect, useState } from "react";

function Settings({
  toggleState,
  toggleMobileState,
  settoggleMobileState,
  setToggleState,
  activeTab,
}) {
  const rateScores = [
    { imoji: "😭", text: "Bad" },
    { imoji: "😑", text: "Not so good" },
    { imoji: "🙂", text: "Good" },
    { imoji: "😃", text: "Very good" },
    { imoji: "😍", text: "Excellent" },
  ];
  const navigate = useNavigate();
  const [rateModal, setRateModal] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);
  const [selectedScoreValue, setSelectedScoreValue] = useState(0);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [ratingCheckFailed, setRatingCheckFailed] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [isNotify, setIsNotify] = useState(null);

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) throw error;

      toast.success("Signed out successfully!");
      navigate("/login", { replace: true });
      settoggleMobileState(1);
      setToggleState(1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleScore = (score) => {
    switch (score.text) {
      case "Bad":
        setSelectedScoreValue(1);
        break;
      case "Not so good":
        setSelectedScoreValue(2);
        break;
      case "Good":
        setSelectedScoreValue(3);
        break;
      case "Very good":
        setSelectedScoreValue(4);
        break;
      case "Excellent":
        setSelectedScoreValue(5);
        break;
      default:
        setSelectedScoreValue(0);
    }
    setSelectedScore(score.text);
  };

  useEffect(() => {
    const checkPreviousRating = async () => {
      setIsChecking(true);
      setRatingCheckFailed(false);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("ratings")
            .select("id")
            .eq("user_id", user.id)
            .limit(1)
            .maybeSingle();

          if (error) throw error;
          if (data) setHasRated(true);
        } else if (localStorage.getItem("has_rated_app") === "true") {
          setHasRated(true);
        }
      } catch {
        setRatingCheckFailed(true);
        toast.error("Could not verify rating status.");
      } finally {
        setIsChecking(false);
      }
    };

    if (rateModal) {
      checkPreviousRating();
    }
  }, [rateModal]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedScore) {
      toast.error("Please select a rating first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("ratings").insert([
        {
          user_id: user?.id ?? null,
          score_value: selectedScoreValue,
          score_label: selectedScore,
          description: description.trim() || null,
        },
      ]);

      if (error) throw error;

      localStorage.setItem("has_rated_app", "true");
      setHasRated(true);

      toast.success("Thank you for your feedback!");
      setSelectedScore(null);
      setDescription("");
      setRateModal(false);
    } catch (err) {
      toast.error(
        err.message || "Failed to submit feedback. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isNotify) {
      toast.success("Notifications are turned on");
    } else {
      toast.success("Notifications are turned off");
    }
  }, [isNotify]);

  return (
    <div
      className={` Settings w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 6 ? "block" : "hidden"}
         ${toggleState === 6 ? "md:block" : "md:hidden"}
        `}
    >
      <div className="hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-3">
        <h1 className="text-3xl font-bold text-white w-full md:w-auto text-center md:text-left">
          Settings
        </h1>
      </div>

      <div
        className="w-full mb-3 transition-all duration-300 glass
            shadow-[0_5px_15px_rgba(0,0,0,0.2)] py-8 px-6"
      >
        <div className="flex flex-col gap-4 h-full overflow-y-auto glass-scroll pr-2">
          {/* General */}
          <div className="cardS mb-3 text-white">
            <h1 className="text-2xl font-bold mb-4">General</h1>

            <div className="flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 
                                    6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 
                                    0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                    />
                  </svg>
                  <p className="font-medium">Notifications</p>
                </div>
                <label className="inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isNotify}
                    onChange={(e) => setIsNotify(e.target.checked)}
                  />
                  <div
                    className="relative w-11 h-6 bg-white/15 rounded-full peer ring-1 peer-focus:ring-1 peer-focus:ring-white/50 
                                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] 
                                after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white/90 after:rounded-full 
                                after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-white/50"
                  ></div>
                </label>
              </div>
            </div>
            <Link to={"/Help"}>
              <div className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-question w-5 text-center text-white/80"></i>
                    <p className="font-medium">Help Center</p>
                  </div>
                  <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
                </div>
              </div>
            </Link>
          </div>

          {/* Secure */}
          <div className="cardS mb-3 text-white">
            <h1 className="text-2xl font-bold mb-4">Secure</h1>

            <div
              className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out"
              onClick={() => setRateModal(!rateModal)}
            >
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-star"></i>
                  <p className="font-medium">Rate Service</p>
                </div>
                <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
              </div>
            </div>

            <ShareButton />
            <Link to={"/Privacy"}>
              <div className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-shield-halved"></i>
                    <p className="font-medium">Privacy Policy</p>
                  </div>
                  <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
                </div>
              </div>
            </Link>

            <Link to={"/Terms_and_Conditions"}>
              <div className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-file-contract"></i>
                    <p className="font-medium">Terms & Conditions</p>
                  </div>
                  <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
                </div>
              </div>
            </Link>

            <div className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope"></i>
                  <p className="font-medium">Contact</p>
                </div>
                <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
              </div>
            </div>
          </div>

          {/* Account */}
          <div className="cardS mb-3 text-white">
            <h1 className="text-2xl font-bold mb-4">Account</h1>

            <div
              className={`group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out ${toggleState === 0 ? "bg-white/20" : ""}
                `}
              onClick={() => {
                setToggleState(0);
                settoggleMobileState(0);
              }}
            >
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-user-gear"></i>
                  <p className="font-medium">Manage My Account</p>
                </div>
                <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-white/30 w-full py-3 px-3 mb-2">
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 
                                        0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  <p className="font-medium text-white">Backup Your Data</p>
                </div>

                <button
                  className="flex gap-2 items-center px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white rounded-lg 
                                    hover:-translate-y-1 cursor-pointer active:scale-95 transition-all duration-200"
                >
                  <i className="fa-solid fa-download"></i>
                  <p>Download Backup File</p>
                </button>
              </div>
              <div className="flex flex-row gap-3 text-white/70 text-[11px]">
                <i className="fa-solid fa-user-shield"></i>
                <div className="flex flex-col gap-2">
                  <h1 className="text">Why backup?</h1>
                  <p>
                    Your data is safely backed up to the cloud. Everything is
                    linked to your database account. <br />
                    When opening a new Account, you can upload your backup file
                    to instantly recover and import data.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 text-white/70 text-[11px]">
                <i className="fa-solid fa-circle-info"></i>
                <p>
                  Download a copy of all your schemes, and members as a file.{" "}
                  <br />
                  You can use this file to restore your data later or move it to
                  another device.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-white/30 w-full py-3 px-3 mb-2">
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  <p className="font-medium text-white">Restore from Backup</p>
                </div>

                <div>
                  <RestoreButton />
                </div>
              </div>
              <div className="flex flex-row gap-3 text-white/70 text-[11px]">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div className="flex flex-col gap-2">
                  <h1 className="text">Is this a new account?</h1>
                  <p>
                    If yes, then upload the downloaded file from <br />
                    your previous account to keep your schemes and members.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="group flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2 hover:bg-white/40 cursor-pointer transition-colors duration-300 ease-in-out"
              onClick={handleSignout}
            >
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <p className="font-medium">Logout</p>
                </div>
                <i className="fas fa-chevron-right transition-transform duration-300 group-hover:translate-x-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="footer md:col-span-3 flex grow flex-col sm:flex-row 
            justify-center items-center py-5 px-6 glass text-white mt-auto"
      >
        <p>All rights reserved &copy; 2026 </p>
      </div>
      {rateModal && (
        <div className="fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 h-screen w-screen">
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-86 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999 text-center">
            <div
              className="absolute top-2 right-5 text-white text-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
              onClick={() => setRateModal(false)}
            >
              <p>&times;</p>
            </div>

            {/* 1. LOADING STATE */}
            {isChecking ? (
              <div className="flex flex-col justify-center items-center w-full text-white p-14">
                <p className="text-lg animate-pulse">Checking...</p>
              </div>
            ) : ratingCheckFailed ? (
              <div className="flex flex-col justify-center items-center w-full text-white mb-4 p-10 space-y-4">
                <h1 className="text-2xl font-semibold">
                  Could not verify your rating
                </h1>
                <p className="text-sm text-white/80 max-w-sm">
                  Please close this window and try again. We can&apos;t accept
                  another rating until we can check your previous response.
                </p>
                <button
                  type="button"
                  onClick={() => setRateModal(false)}
                  className="mt-4 rounded-2xl bg-white/30 hover:bg-white/40 transition-colors duration-300 w-full py-3 px-3 cursor-pointer font-medium"
                >
                  Close
                </button>
              </div>
            ) : hasRated ? (
              /* 2. DIFFERENT CONTENT IF ALREADY RATED */
              <div className="flex flex-col justify-center items-center w-full text-white mb-4 p-10 space-y-4">
                <p className="text-5xl">🎉</p>
                <h1 className="text-2xl font-semibold">
                  You&apos;ve already rated!
                </h1>
                <p className="text-sm text-white/80 max-w-sm">
                  Thank you for taking the time to share your feedback. Your
                  response helps us improve!
                </p>
                <button
                  type="button"
                  onClick={() => setRateModal(false)}
                  className="mt-4 rounded-2xl bg-white/30 hover:bg-white/40 transition-colors duration-300 w-full py-3 px-3 cursor-pointer font-medium"
                >
                  Got it
                </button>
              </div>
            ) : (
              /* 3. ORIGINAL RATING FORM IF NOT RATED YET */
              <div className="flex flex-col justify-center items-center w-full text-white mb-4 p-10">
                <h1 className="text-2xl">How was your experience?</h1>
                <div className="mt-6">
                  <ul className="flex gap-8">
                    {rateScores.map((score) => {
                      const isSelected = selectedScore === score.text;
                      const isDimmed = selectedScore !== null && !isSelected;

                      return (
                        <li
                          key={score.text}
                          onClick={() => handleScore(score)}
                          className={`group flex flex-col items-center cursor-pointer transition-all duration-300 hover:saturate-100 hover:opacity-100 ${
                            isDimmed
                              ? "saturate-0 opacity-50"
                              : "saturate-100 opacity-100"
                          }`}
                        >
                          <p
                            className={`text-[26px] transition-transform duration-300 group-hover:-translate-y-1 ${
                              isSelected ? "-translate-y-1 scale-110" : ""
                            }`}
                          >
                            {score.imoji}
                          </p>
                          <p
                            className={`text-[11px] transition-colors duration-300 ${
                              isSelected ? "font-semibold" : ""
                            }`}
                          >
                            {score.text}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <textarea
                  className="w-full mt-6 p-4 border-0 outline-0 text-[#575757] bg-white/60 rounded-2xl glass-scroll"
                  placeholder="Description...(Optional)"
                  cols="30"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 rounded-2xl bg-white/30 hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 w-full py-3 px-3 cursor-pointer font-medium"
                  onClick={handleRatingSubmit}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
