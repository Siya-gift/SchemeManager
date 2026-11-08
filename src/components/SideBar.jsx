import React, { useState, useEffect } from "react";
import luffyImg from "../images/Luffy_profile_pic.jpg";
import { supabase } from "../lib/supabaseClient.js";

function SideBar({
  toggleState,
  activeTab,
  selectedSchemeName,
}) {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    let active = true;
    let requestId = 0;

    async function fetchProfile(user) {
      const currentRequestId = ++requestId;
      const metadataName = user?.user_metadata?.name;

      if (!user) {
        setName("User");
        return;
      }

      if (metadataName) setName(metadataName);

      let data;
      let error;
      try {
        ({ data, error } = await supabase
          .from("Members")
          .select("member_name")
          .eq("id", user.id)
          .maybeSingle());
      } catch (fetchError) {
        if (!active || currentRequestId !== requestId) return;
        console.error("Error fetching member name:", fetchError);
        setName(metadataName || "User");
        return;
      }

      if (!active || currentRequestId !== requestId) return;

      if (error) {
        console.error("Error fetching member name:", error.message);
        setName(metadataName || "User");
        return;
      }

      setName(data?.member_name || metadataName || "User");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void fetchProfile(session?.user ?? null);
    });

    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error("Error fetching authenticated user:", error.message);
        setName("User");
        return;
      }
      void fetchProfile(data.user);
    }).catch((error) => {
      console.error("Error fetching authenticated user:", error);
      setName("User");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      className="hidden md:block container w-80 min-h-screen m-5
            p-5 glass"
    >
      <div
        onClick={() => activeTab(0)}
        className={`profileCard glass p-5 relative cursor-pointer hover:bg-white/45
                ${toggleState === 0 ? "bg-white/20" : ""}
                `}
      >
        <div className="ppic static -top-1 left-[50%] w-30 h-30 rounded-full overflow-hidden">
          <img src={luffyImg} className="h-full w-full object-cover" />
        </div>
        <h1 className="text-white text-3xl font-bold">{name}</h1>
        <small className="text-[#abe9be] block min-w-55 max-w-50 truncate">
          Scheme : {selectedSchemeName}
        </small>
      </div>
      <div className="glass p-5 mt-5">
        <h3 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider opacity-70">
          OVERVIEW
        </h3>
        <ul className="space-y-2">
          <li
            onClick={() => activeTab(1)}
            className={`flex items-center gap-2 p-3  hover:bg-white/20 rounded-lg 
                        ${toggleState === 1 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        border  text-white cursor-pointer transition
                    `}
          >
            <i className="fa-solid fa-house"></i>Dashboard
          </li>
        </ul>
        <h3 className="text-white text-sm font-semibold my-5 uppercase tracking-wider opacity-70">
          MANAGER
        </h3>
        <ul className="space-y-2">
          <li
            onClick={() => activeTab(2)}
            className={`flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg 
                        ${toggleState === 2 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        border border-white/10 text-white cursor-pointer transition`}
          >
            <i className="fa-solid fa-layer-group"></i>Scheme & Members
          </li>
          <li
            onClick={() => activeTab(3)}
            className={`flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg 
                        ${toggleState === 3 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        border border-white/10 text-white cursor-pointer transition`}
          >
            <i className="fa-solid fa-file-invoice"></i>Expenses
          </li>
          <li
            onClick={() => activeTab(4)}
            className={`flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg 
                        ${toggleState === 4 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                        border border-white/10 text-white cursor-pointer transition`}
          >
            <i className="fa-solid fa-chart-line"></i>Insights
          </li>
        </ul>
        <h3 className="text-white text-sm font-semibold my-5 uppercase tracking-wider opacity-70">
          SYSTEM
        </h3>
        <ul className="space-y-2">
          <li
            onClick={() => activeTab(5)}
            className={`flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg
                        ${toggleState === 5 ? "bg-white /20 border-white/80" : "bg-white/10 border-white/10"} 
                        border border-white/10 text-white cursor-pointer transition`}
          >
            <i className="fa-solid fa-clock-rotate-left"></i>Activity History
          </li>
          <li
            onClick={() => activeTab(6)}
            className={`flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg
                    ${toggleState === 6 ? "bg-white/20 border-white/80" : "bg-white/10 border-white/10"} 
                         border border-white/10 text-white cursor-pointer transition`}
          >
            <i className="fa-solid fa-gear"></i>Settings
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
