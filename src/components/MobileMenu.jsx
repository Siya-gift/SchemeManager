import React from 'react'
import MobileNav from './MobileNav'
import { useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function MobileMenu({ isOpen, toggleMenu }) {

    const menuRef = useRef();

    useGSAP(() => {
        gsap.to(menuRef.current, {
            y: isOpen ? 0 : "100%",
            opacity: isOpen ? 1 : 0,
            duration: 0.5,
            ease: "power3.out",
            display: isOpen ? "block" : "none"
        });
    }, [isOpen]);

    return (
        <div ref={menuRef}
            className='fixed bottom-0 w-full h-[40svh] z-10 px-10 py-2 
             bg-white/30 backdrop-blur-[50px] border-t rounded-b-0 border-white/20 
             Menu glass-scroll rounded-t-3xl'>
            <div className='sticky top-2 dragger w-40 h-2 mx-auto rounded-md bg-white mb-10'></div>

            <div className='w-full max-h-52 overflow-y-auto glass-scroll pt-2'>
                <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>OVERVIEW</h3>
                <ul>
                    <li className='flex items-center text-white gap-3 p-3 font-light 
                    bg-white/30'>
                        <i class="fa-solid fa-house"></i>Dashboard
                    </li>
                </ul>
                <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>MANAGER</h3>
                <ul>
                    <li className='flex items-center text-white gap-3 p-3 border-b font-light'>
                        <i class="fa-solid fa-layer-group"></i>Scheme & Members
                    </li>
                    <li className='flex items-center text-white gap-3 p-3 border-b font-light'>
                        <i class="fa-solid fa-file-invoice"></i>Expenses
                    </li>
                    <li className='flex items-center text-white gap-3 p-3 font-light'>
                        <i class="fa-solid fa-chart-line"></i>Insights
                    </li>
                </ul>
                <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>SYSTEM</h3>
                <ul>
                    <li className='flex items-center text-white gap-3 p-3 font-light'>
                        <i class="fa-solid fa-clock-rotate-left"></i>Activity History
                    </li>
                    <li className='flex items-center text-white gap-3 p-3 font-light'>
                        <i class="fa-solid fa-gear"></i>Settings
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default MobileMenu