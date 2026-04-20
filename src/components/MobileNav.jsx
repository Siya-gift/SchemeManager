import React, { useState, useRef } from 'react';
import luffyImg from '../images/Luffy_profile_pic.jpg';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function MobileNav({ isOpen, toggleMenu }) {
    const container = useRef();

    useGSAP(() => {
        if (isOpen) {
            gsap.to(".line1", { rotate: 45, y: 8, duration: 0.3 });
            gsap.to(".line2", { opacity: 0, x: -20, duration: 0.3 });
            gsap.to(".line3", { rotate: -45, y: -8, duration: 0.3 });
        } else {
            gsap.to(".line1", { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(".line2", { opacity: 1, x: 0, duration: 0.3 });
            gsap.to(".line3", { rotate: 0, y: 0, duration: 0.3 });
        }
    }, { scope: container, dependencies: [isOpen] });
    

    return (
        <div ref={container}>
            <div className='profile w-[95%] max-w-125 mx-auto p-6 glass flex md:hidden 
            justify-between items-center mt-3 rounded-2xl cursor-pointer hover:bg-white/45'>
                <div className='pp flex items-center gap-3'>
                    <div className="ppic w-10 h-10 rounded-full overflow-hidden border border-white/20">
                        <img src={luffyImg} className="h-full w-full object-cover" alt="profile" />
                    </div>
                    <div>
                        <h1 className='text-white text-xl font-bold'>Vusi Nkosi</h1>
                        <small className='text-[#abe9be] block'>Scheme Owner</small>
                    </div>
                </div>

                <div className='burger w-6' onClick={toggleMenu}>
                    <div className='line1 h-0.75 w-full bg-white rounded-sm'></div>
                    <div className='line2 h-0.75 w-full bg-white rounded-sm mt-1.25'></div>
                    <div className='line3 h-0.75 w-full bg-white rounded-sm mt-1.25'></div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav;
