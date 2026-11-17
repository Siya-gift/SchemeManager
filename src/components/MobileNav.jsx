import React, { useState, useRef, useEffect } from "react";
import luffyImg from "../images/Luffy_profile_pic.jpg";
import dash_logo from "../images/dash_logo.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "../lib/supabaseClient.js";
import { getAuthUserDisplayName } from "../lib/authUserName.js";

function MobileNav({ isOpen, toggleMenu, setToggleState, settoggleMobileState, setOverlayer, selectedSchemeName }) {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (isOpen) {
        tl.to(".line1", { rotate: 45, y: 8, duration: 0.3 })
          .to(".line2", { opacity: 0, x: -20, duration: 0.3 }, "<")
          .to(".line3", { rotate: -45, y: -8, duration: 0.3 }, "<")
          .call(() => setOverlayer(true));
      } else {
        tl.to(".line1", { rotate: 0, y: 0, duration: 0.3 })
          .to(".line2", { opacity: 1, x: 0, duration: 0.3 }, "<")
          .to(".line3", { rotate: 0, y: 0, duration: 0.3 }, "<")
          .call(() => setOverlayer(false));
      }
    },
    { scope: container, dependencies: [isOpen] },
  );

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

  // Inside your component:
  const [name, setName] = useState("Account");
  const [userProfilePicture, setUserProfilePicture] = useState("");

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

  return (
    <div ref={container}>
      <div
        className=" mx-4 p-6 glass flex md:hidden 
            justify-between items-center mt-3 rounded-2xl cursor-pointer hover:bg-white/45"
      >
        <div
          className="relative pp flex items-center gap-3"
          onClick={() => {
            setToggleState(0);
            settoggleMobileState(0);
          }}
        >
          <div className=" ppic w-10 h-10 rounded-full overflow-hidden border border-white/20">
            <img
              src={userProfilePicture ? userProfilePicture : luffyImg}
              className="h-full w-full object-cover"
              alt="profile"
            />
          </div>
          <img
            className="absolute -bottom-2 left-0 w-12"
            src={dash_logo}
            alt="logo"
          />
          <div>
            <h1 className="text-white text-xl font-bold">{name}</h1>
            <small className="text-[#abe9be] block truncate max-w-45">
              Scheme: {selectedSchemeName}
            </small>
          </div>
        </div>

        <div className="burger z-50 w-6" onClick={toggleMenu}>
          <div className="line1 h-0.75 w-full z-20 bg-white rounded-sm transition-all duration-300"></div>
          <div className="line2 h-0.75 w-full z-20 bg-white rounded-sm transition-all duration-300 mt-1.25"></div>
          <div className="line3 h-0.75 w-full z-20 bg-white rounded-sm transition-all duration-300 mt-1.25"></div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
