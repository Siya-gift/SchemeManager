import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

function MobileMenu({ isOpen, setIsOpen, toggleMenu, toggleMobileState, settoggleMobileState, toggleTabMobile }) {

    const menuRef = useRef();
    const draggableRef = useRef(null);
    const initializedRef = useRef(false);

    useGSAP(() => {
        const menu = menuRef.current;
        if (!menu) return;

        if (!initializedRef.current) {
            gsap.set(menu, {
                yPercent: 100,
                autoAlpha: 0,
                pointerEvents: "none",
            });
            initializedRef.current = true;
        }

        draggableRef.current?.kill();
        gsap.killTweensOf(menu);

        if (isOpen) {
            gsap.set(menu, { y: 0, autoAlpha: 1, pointerEvents: "auto" });
            gsap.to(menu, {
                yPercent: 0,
                duration: 0.4,
                ease: "power3.out",
            });

            draggableRef.current = Draggable.create(menu, {
                type: "y",
                trigger: menu.querySelector("#dragger"),
                bounds: {
                    minY: 0,
                    maxY: window.innerHeight - menu.offsetHeight,
                },
                inertia: true,
                dragClickables: true,
                onDragEnd() {
                    if (this.y > 100) {
                        toggleMenu(false);
                    } else {
                        gsap.to(menu, { y: 0, duration: 0.3 });
                    }
                },
            })[0];
        } else {
            gsap.to(menu, {
                yPercent: 100,
                autoAlpha: 0,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(menu, { y: 0, pointerEvents: "none" });
                },
            });
        }
    }, [isOpen]);

    useEffect(() => () => {
        draggableRef.current?.kill();
    }, []);


    return (
        <div ref={menuRef}
            className='fixed bottom-0 w-full h-[60svh] z-10 px-10 py-2 
             bg-white/30 backdrop-blur-[50px] border-t rounded-b-0 border-white/20 
             Menu glass-scroll rounded-t-3xl' id='Menu'>
            <div className='sticky top-2 dragger w-40 h-2 mx-auto rounded-md bg-white mb-10'
                id='dragger'
            ></div>


            <div className='w-full max-h-[70%] overflow-y-auto glass-scroll py-2'>
                <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>OVERVIEW</h3>
                <ul>
                    <li
                        onClick={() => {
                            toggleTabMobile(1);
                            setIsOpen(false)
                        }}
                        className={`relative flex items-center text-white gap-3 p-3 font-light 
                        ${toggleMobileState === 1 ? "bg-white/30 tab-leg" : ""}`}>
                        <i className="fa-solid fa-house"></i>Dashboard
                    </li>
                </ul>
                <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>MANAGER</h3>
                <ul>
                    <li
                        onClick={() => {
                            toggleTabMobile(2) 
                            setIsOpen(false)
                        }}
                        className={`relative flex items-center text-white gap-3 p-3 border-b font-light
                        ${toggleMobileState === 2 ? "bg-white/30 tab-leg" : ""}`}>
                        <i className="fa-solid fa-layer-group"></i>Scheme & Members
                    </li>
                    <li
                        onClick={() => {
                            toggleTabMobile(3) 
                            setIsOpen(false)
                        }}
                        className={`relative flex items-center text-white gap-3 p-3 border-b font-light
                        ${toggleMobileState === 3 ? "bg-white/30 tab-leg" : ""}`}>
                        <i className="fa-solid fa-file-invoice"></i>Expenses
                    </li>
                    <li
                        onClick={() => {
                            toggleTabMobile(4) 
                            setIsOpen(false)
                        }}
                        className={`relative flex items-center text-white gap-3 p-3 font-light
                        ${toggleMobileState === 4 ? "bg-white/30 tab-leg" : ""}`}>
                        <i className="fa-solid fa-chart-line"></i>Insights
                    </li>
                </ul>
                <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>SYSTEM</h3>
                <ul>
                    <li
                        onClick={() => {
                            toggleTabMobile(5) 
                            setIsOpen(false)
                        }}
                        className={`relative flex items-center text-white gap-3 p-3 border-b font-light
                        ${toggleMobileState === 5 ? "bg-white/30 tab-leg" : ""}`}>
                        <i className="fa-solid fa-clock-rotate-left"></i>Activity History
                    </li>
                    <li
                        onClick={() => {
                            toggleTabMobile(6) 
                            setIsOpen(false)
                        }}
                        className={`relative flex items-center text-white gap-3 p-3 font-light
                        ${toggleMobileState === 6 ? "bg-white/30 tab-leg" : ""}`}>
                        <i className="fa-solid fa-gear"></i>Settings
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default MobileMenu