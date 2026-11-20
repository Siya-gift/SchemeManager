import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Luffy_profile_pic from "../images/Luffy_profile_pic.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Notifications({ desktopTab, mobileTab, tabId, overlayer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const bellRef = useRef(null);
  const notification_ref = useRef(null);
  const isActive = isDesktop ? desktopTab === tabId : mobileTab === tabId;
  const notifications = [
    {
      id: 1,
      title: "Wayne Jackson",
      message: "Member Request",
      timestamp: "12:04 PM",
      status: "new",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=WayneJackson",
    },
    {
      id: 2,
      title: "Thabo Mokoena",
      message: "Monthly Contribution Paid",
      timestamp: "11:45 AM",
      status: "new",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=ThaboMokoena",
    },
    {
      id: 3,
      title: "Lerato Khumalo",
      message: "Accepted your scheme invite",
      timestamp: "11:12 AM",
      status: "new",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=LeratoKhumalo",
    },
    {
      id: 4,
      title: "Naledi Dlamini",
      message: "Member Request",
      timestamp: "10:30 AM",
      status: "new",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=NalediDlamini",
    },
    {
      id: 5,
      title: "Sipho Ndlovu",
      message: "Uploaded proof of payment",
      timestamp: "09:50 AM",
      status: "new",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=SiphoNdlovu",
    },
    {
      id: 6,
      title: "Zanele Sithole",
      message: "Updated profile details",
      timestamp: "09:15 AM",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=ZaneleSithole",
    },
    {
      id: 7,
      title: "Kabelo Molefe",
      message: "Payment overdue by 3 days",
      timestamp: "Yesterday",
      status: "new",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=KabeloMolefe",
    },
    {
      id: 8,
      title: "Amahle Zwane",
      message: "Member Request",
      timestamp: "Yesterday",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=AmahleZwane",
    },
    {
      id: 9,
      title: "Bongani Zulu",
      message: "Requested account statement",
      timestamp: "Yesterday",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=BonganiZulu",
    },
    {
      id: 10,
      title: "Precious Mahlangu",
      message: "Monthly Contribution Paid",
      timestamp: "Nov 18",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=PreciousMahlangu",
    },
    {
      id: 11,
      title: "Tshepo Van Wyk",
      message: "Member Request",
      timestamp: "Nov 18",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=TshepoVanWyk",
    },
    {
      id: 12,
      title: "Annalise Botha",
      message: "Accepted your scheme invite",
      timestamp: "Nov 17",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=AnnaliseBotha",
    },
    {
      id: 13,
      title: "Mpho Sekgobela",
      message: "Cleared arrears balance",
      timestamp: "Nov 17",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=MphoSekgobela",
    },
    {
      id: 14,
      title: "Rethabile Modise",
      message: "Commented on payout schedule",
      timestamp: "Nov 16",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=RethabileModise",
    },
    {
      id: 15,
      title: "Sibusiso Mthembu",
      message: "Member Request",
      timestamp: "Nov 15",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=SibusisoMthembu",
    },
    {
      id: 16,
      title: "Nomvula Cele",
      message: "Downloaded annual statement",
      timestamp: "Nov 14",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=NomvulaCele",
    },
    {
      id: 17,
      title: "Liam Naidoo",
      message: "Joined as Co-Admin",
      timestamp: "Nov 12",
      status: "read",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=LiamNaidoo",
    },
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

  // Optional: Sync with the `overlayer` prop if it's a ref or state setter
  useEffect(() => {
    const shouldShow = isOpen && isActive;
    if (!overlayer) return;

    if (typeof overlayer === "function") {
      overlayer(shouldShow);
    } else if (overlayer.current) {
      overlayer.current.style.display = shouldShow ? "block" : "none";
      overlayer.current.onclick = () => setIsOpen(false);
    }
  }, [isOpen, isActive, overlayer]);

  const openModal = () => {
    setIsOpen((prev) => !prev);
  };

  useGSAP(
    () => {
      if (!isOpen || !isActive || !notification_ref.current) return;

      gsap.fromTo(
        notification_ref.current,
        { opacity: 0, y: 80, scale: 0.78 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "ease.out" },
      );
    },
    { dependencies: [isOpen, isActive] },
  );

  return (
    <>
      <div
        ref={bellRef}
        className={
          "relative transition-all duration-300 ease-in cursor-pointer hover:text-lime-200 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]" +
          (isOpen ? " text-lime-500" : "")
        }
        onClick={openModal}
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
          <>
            {/* Dimmed Overlayer */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-2147483646 bg-black/50 transition-opacity duration-300"
            />

            {/* Notification Modal */}
            <div
              className="fixed z-2147483647 bg-white p-4 shadow-lg overflow-hidden rounded-lg"
              ref={notification_ref}
              style={{
                top: `${position.top}px`,
                left: position.isMobile ? "50%" : "auto",
                right: position.isMobile ? "auto" : `${position.right}px`,
                transform: position.isMobile ? "translateX(-50%)" : "none",
              }}
            >
              <div className="relative">
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  aria-label="Close"
                  className="absolute -top-3 -right-3 flex h-6 w-6 aspect-square items-center justify-center rounded text-black hover:bg-black/10 z-2147483647 cursor-pointer"
                >
                  <span className="text-[18px] leading-none">&times;</span>
                </button>

                <p className="text-black font-medium mb-3">Messages</p>

                <div className="flex flex-col h-full w-70 md:w-90">
                  <ul className="flex flex-col h-185 overflow-y-auto pr-1 glass-scroll">
                    {notifications.map((notification) => (
                      <li
                        className="p-4 border-b border-slate-200 last:border-b-0"
                        key={notification.id}
                      >
                        <div className="flex flex-row gap-2">
                          <div
                            className="border border-black rounded-2xl h-6 aspect-square bg-cover no-repeat bg-center"
                            style={{
                              backgroundImage: `url(${notification.image})`,
                            }}
                          ></div>
                          <div>
                            <div className="flex flex-col">
                              <h3 className="text-black text-[11px] font-bold">
                                {notification.title}
                              </h3>
                              <h6 className="text-slate-500 text-[8px] font-medium">
                                {notification.message}
                              </h6>
                              <p className="text-blue-500 text-[8px] cursor-pointer hover:translate-x-1 hover:text-blue-400 transition-all duration-300 ease-in underline">
                                view
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
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

export default Notifications;
