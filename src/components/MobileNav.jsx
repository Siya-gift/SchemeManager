import React, { useState, useRef, useEffect } from 'react';
import luffyImg from '../images/Luffy_profile_pic.jpg';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "../lib/supabaseClient.js";

function MobileNav({ isOpen, toggleMenu, setOverlayer, selectedSchemeName }) {
    const container = useRef();

    useGSAP(() => {
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
    }, { scope: container, dependencies: [isOpen] });



    const [name, setName] = useState("Loading...");
    
      useEffect(() => {
        async function fetchProfile() {
          // 1. Fetch the current logged-in authenticated user
          const {
            data: { user },
          } = await supabase.auth.getUser();
    
        //   consoole.log("Authenticated user:", user);
    
          if (user) {
            // 2. Fetch the name matching that user's ID from your Users table
            const { data, error } = await supabase
              .from("Members")
              .select("member_name")
              .eq("id", user.id)
              .single();
    
            if (data && data.member_name) {
              setName(data.member_name);
            } else {
              setName("User"); // Fallback if member_name is empty
              if (error) console.error("Error fetching name:", error.message);
            }
          } else {
            setName("Guest"); // Fallback if no user is logged in
          }
        }
        fetchProfile();
      }, []);


    return (
        <div ref={container}>
            <div className=' mx-4 p-6 glass flex md:hidden 
            justify-between items-center mt-3 rounded-2xl cursor-pointer hover:bg-white/45'>
                <div className='pp flex items-center gap-3'>
                    <div className="ppic w-10 h-10 rounded-full overflow-hidden border border-white/20">
                        <img src={luffyImg} className="h-full w-full object-cover" alt="profile" />
                    </div>
                    <div>
                        <h1 className='text-white text-xl font-bold'>{name}</h1>
                        <small className='text-[#abe9be] block truncate max-w-45'>Scheme: {selectedSchemeName}</small>
                    </div>
                </div>

                <div className='burger z-50 w-6' onClick={toggleMenu}>
                    <div className='line1 h-0.75 w-full z-20 bg-white rounded-sm'></div>
                    <div className='line2 h-0.75 w-[70%] z-20 bg-white rounded-sm mt-1.25'></div>
                    <div className='line3 h-0.75 w-full z-20 bg-white rounded-sm mt-1.25'></div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav;
