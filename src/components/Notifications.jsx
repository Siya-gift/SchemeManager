import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Luffy_profile_pic from "../images/Luffy_profile_pic.jpg";

function Notifications({ desktopTab, mobileTab, tabId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const bellRef = useRef(null);
  const isActive = isDesktop ? desktopTab === tabId : mobileTab === tabId;
  const notifications = [
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic },
    { id: 1, title: "Wayne Jackson", message: "Member Request", timestamp: "12:00 PM", status: "new", image: Luffy_profile_pic }
  ];

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const updateBreakpoint = () => setIsDesktop(breakpoint.matches);

    updateBreakpoint();
    breakpoint.addEventListener("change", updateBreakpoint);

    return () => breakpoint.removeEventListener("change", updateBreakpoint);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || !isActive) return;

    const updatePosition = () => {
      if (!bellRef.current) return;

      const bounds = bellRef.current.getBoundingClientRect();
      setPosition({
        top: bounds.bottom + 12,
        right: window.innerWidth - bounds.left,
        isMobile: window.innerWidth < 768,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isActive, isOpen]);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={bellRef}
        className={
          "relative transition-all duration-300 ease-in cursor-pointer hover:text-lime-200 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]" +
          (isOpen ? " text-lime-500" : "")
        }
        onClick={() => openModal()}
      >
        <i className="fa-solid fa-bell"></i>
        <div className="absolute -top-1 -right-1 md:top-0 md:right-0 flex h-3 aspect-square items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
          3
        </div>
      </div>

      {isOpen &&
        isActive &&
        position &&
        createPortal(
          <div
            className="fixed z-2147483647 max-h-100 shadow-lg overflow-hidden"
            style={{
              top: `${position.top}px`,
              left: position.isMobile ? "50%" : "auto",
              right: position.isMobile ? "auto" : `${position.right}px`,
              transform: position.isMobile ? "translateX(-50%)" : "none",
            }}
          >
            <div className="flex flex-col bg-white h-full w-80 md:w-auto">
              <ul className="flex flex-col max-h-100 overflow-y-auto glass-scrollbar">
                {notifications.map((notification) => (
                  <li className="p-4 border-b border-slate-200 last:border-b-0" key={notification.id}>
                    <div className="flex flex-row gap-2">
                      <div
                      className="border border-black rounded-2xl h-6 aspect-square bg-cover no-repeat bg-center"
                      style={{ backgroundImage: `url(${notification.image})` }}
                      ></div>
                      <div>
                        <div className="flex flex-col">
                          <h3 className="text-black text-[11px] font-bold">
                            {notification.title}
                          </h3>
                          <h6 className="text-slate-500 text-[8px] font-medium">
                            {notification.message}
                          </h6>
                          <p className="text-blue-500 text-[8px] cursor-pointer hover:text-blue-200 transition-all duration-300 ease-in underline">
                            See More.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between grow items-end ml-5">
                        <div className="flex flex-col justify-between grow items-end">
                          <p className="text-[8px] font-semibold text-white bg-lime-500 px-1 py-0.5 rounded-full">
                            {notification.status === "new" ? "New" : ""}
                          </p>
                          <p className="text-xs text-slate-500 text-[8px]">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default Notifications;
