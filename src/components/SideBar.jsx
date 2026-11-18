import React, { useState, useEffect } from "react";
import luffyImg from "../images/PP_empty_icon.jpg";
import logout_ic from "../images/logout_ic.svg";
import dash_logo from "../images/dash_logo.svg";
import close_side_icon from "../images/close_side_icon.svg";
import { supabase } from "../lib/supabaseClient.js";
import { getAuthUserDisplayName } from "../lib/authUserName.js";

function SideBar({
  toggleState,
  setToggleState,
  activeTab,
  selectedSchemeName,
  settoggleMobileState,
}) {
  // Inside your component:
  const [name, setName] = useState("Account");
  const [userProfilePicture, setUserProfilePicture] = useState("");

  const getAuthUserAvatar = async (user) => {
    if (!user) return "";

    try {
      const { data: files, error } = await supabase.storage
        .from("profile_pictures")
        .list(user.id, {
          limit: 10,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (!error && files) {
        // Ignore Supabase's hidden folder placeholder file
        const validFile = files.find(
          (file) => file.name !== ".emptyFolderPlaceholder",
        );

        if (validFile) {
          const { data } = supabase.storage
            .from("profile_pictures")
            .getPublicUrl(`${user.id}/${validFile.name}`);

          if (data?.publicUrl) return data.publicUrl;
        }
      }
    } catch (err) {
      console.error("Error fetching avatar from storage:", err);
    }

    return "";
  };

  useEffect(() => {
    let active = true;
    let authStateReceived = false;

    const loadUser = async (user) => {
      if (!active) return;
      setName(getAuthUserDisplayName(user));
      const avatarUrl = await getAuthUserAvatar(user);
      if (active) {
        setUserProfilePicture(avatarUrl);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authStateReceived = true;
      loadUser(session?.user);
    });

    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (!active || authStateReceived) return;
        if (error) {
          console.error("Error fetching authenticated user:", error.message);
          setName("Account");
          setUserProfilePicture("");
          return;
        }
        loadUser(data.user);
      })
      .catch((error) => {
        if (!active) return;
        console.error("Error fetching authenticated user:", error);
        setName("Account");
        setUserProfilePicture("");
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const [uistate, setUiState] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUI = () => {
    setUiState(!uistate);
  };

  const handleSignout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) throw error;

      toast.success("Signed out successfully!");
      navigate("/", { replace: true });
      settoggleMobileState(1);
      setToggleState(1);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`hidden md:flex md:flex-col md:flex-none m-5 min-h-[calc(100vh-2.5rem)] p-5 glass transition-[width] duration-300 ease-in-out ${
        uistate ? "w-32" : "w-80"
      }`}
    >
      <div
        className={`profileCard glass relative ${uistate ? "p-0" : "p-5"} transition-padding duration-300 ease-in-out`}
      >
        <div
          className={`mb-3 flex h-8 items-center ${uistate ? "justify-center" : "justify-between"} `}
        >
          <img
            className={`h-8 object-contain transition-[width,opacity] duration-200 ${
              uistate ? "w-0 opacity-0" : "w-20 opacity-100"
            }`}
            src={dash_logo}
            alt="logo"
          />
          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center cursor-pointer"
            title={uistate ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={uistate ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!uistate}
            onClick={handleUI}
          >
            <img
              className={`w-4 aspect-square transition-transform duration-300 ease-in ${
                uistate ? "rotate-180" : ""
              }`}
              src={close_side_icon}
              alt=""
            />
          </button>
        </div>

        <div
          className="flex h-20 w-full items-center justify-center"
          onClick={() => {
            setToggleState(0);
            settoggleMobileState(0);
          }}
        >
          <div
            className={`ppic relative group aspect-square shrink-0 rounded-full overflow-hidden transition-[width,height] duration-300 cursor-pointer ${
              uistate ? "h-10" : "h-20"
            }`}
          >
            <img
              src={userProfilePicture || luffyImg}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = luffyImg;
              }}
              className="h-full w-full object-cover"
              alt="Profile"
            />

            {/* Dark hover overlay with centered cross */}
            {toggleState !== 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-white/75 transition-all duration-200 rotate-0 ${
                    uistate ? "h-4 w-4" : "h-6 w-6"
                  }`}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <h1
          className={`h-9 overflow-hidden truncate whitespace-nowrap text-3xl font-bold text-white transition-opacity duration-200 ${
            uistate ? "opacity-0" : "opacity-100"
          }`}
        >
          {name}
        </h1>
        <small
          className={`block h-5 w-full truncate whitespace-nowrap text-[#abe9be] transition-opacity duration-200 ${
            uistate ? "opacity-0" : "opacity-100"
          }`}
        >
          Scheme : {selectedSchemeName}
        </small>
      </div>
      <div className="glass mt-5 flex flex-col h-full p-5">
        <h3
          className={`mb-3 h-5 overflow-hidden whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-white transition-opacity duration-200 ${
            uistate ? "opacity-0" : "opacity-70"
          }`}
        >
          OVERVIEW
        </h3>
        <ul className="space-y-2">
          <li
            onClick={() => activeTab(1)}
            title="Dashboard"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            }
                        ${toggleState === 1 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                    `}
          >
            <i className="fa-solid fa-house"></i>
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${
                uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"
              }`}
            >
              Dashboard
            </p>
          </li>
        </ul>
        <h3
          className={`my-5 h-5 overflow-hidden whitespace-nowrap text-sm font-semibold uppercase tracking-wider transition-opacity duration-200 ${
            uistate ? "opacity-0" : "text-white opacity-70"
          }`}
        >
          MANAGER
        </h3>
        <ul className="space-y-2">
          <li
            onClick={() => activeTab(2)}
            title="Scheme & Members"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            } bg-white/10
                        ${toggleState === 2 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        `}
          >
            <i className="fa-solid fa-layer-group"></i>
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"}`}
            >
              Scheme & Members
            </p>
          </li>
          <li
            onClick={() => activeTab(3)}
            title="Expenses"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            } bg-white/10
                        ${toggleState === 3 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        `}
          >
            <i className="fa-solid fa-file-invoice"></i>
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"}`}
            >
              Expenses
            </p>
          </li>
          <li
            onClick={() => activeTab(4)}
            title="Insights"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            } bg-white/10
                        ${toggleState === 4 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        `}
          >
            <i className="fa-solid fa-chart-line"></i>
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"}`}
            >
              Insights
            </p>
          </li>
        </ul>
        <h3
          className={`my-5 h-5 overflow-hidden whitespace-nowrap text-sm font-semibold uppercase tracking-wider transition-opacity duration-200 ${
            uistate ? "opacity-0" : "text-white opacity-70"
          }`}
        >
          SYSTEM
        </h3>
        <ul className="space-y-2">
          <li
            onClick={() => activeTab(5)}
            title="Activity History"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            } bg-white/10
                        ${toggleState === 5 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"}`}
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"}`}
            >
              Activity History
            </p>
          </li>
          <li
            onClick={() => activeTab(6)}
            title="Settings"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            } bg-white/10
                    ${toggleState === 6 || toggleState === 0 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"}`}
          >
            <i className="fa-solid fa-gear"></i>
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"}`}
            >
              Settings
            </p>
          </li>
        </ul>
        <ul className="space-y-2 pt-2 mt-auto">
          <li
            onClick={handleSignout}
            title="Logout"
            className={`flex cursor-pointer items-center rounded-lg border p-3 text-white transition hover:bg-white/20 ${
              uistate ? "justify-center" : "gap-2"
            }
                        ${toggleState === 7 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                    `}
          >
            <img src={logout_ic} alt="ic" />
            <p
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${
                uistate ? "max-w-0 opacity-0" : "max-w-50 opacity-100"
              }`}
            >
              {loading ? "Logging out..." : "Logout"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
