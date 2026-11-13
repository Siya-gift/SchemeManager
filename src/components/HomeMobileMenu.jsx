import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Link } from "react-router-dom";

gsap.registerPlugin(Draggable);

function HomeMobileMenu({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const draggerRef = useRef(null);

  // Smooth GSAP slide-out close handler
  const handleClose = useCallback(() => {
    if (!menuRef.current || !overlayRef.current) {
      onClose?.();
      return;
    }

    gsap.to(menuRef.current, {
      y: "100%",
      duration: 0.3,
      ease: "power3.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        onClose?.();
      },
    });
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !menuRef.current || !overlayRef.current) return;

    // 1. Entrance animation (slide up + fade in backdrop)
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 3, ease: "power2.out" },
    );

    gsap.fromTo(
      menuRef.current,
      { y: "100%" },
      { y: "0%", duration: 1, ease: "power3.out" },
    );

    // 2. Setup GSAP Draggable on the menu triggered by the dragger bar
    const draggableInstance = Draggable.create(menuRef.current, {
      type: "y",
      trigger: draggerRef.current,
      bounds: { minY: 0, maxY: window.innerHeight },
      inertia: false,
      onDrag() {
        // Dim overlay proportionally as the user drags down
        const menuHeight = menuRef.current?.offsetHeight || 300;
        const progress = Math.max(0, 1 - this.y / menuHeight);
        gsap.set(overlayRef.current, { opacity: progress });
      },
      onDragEnd() {
        const menuHeight = menuRef.current?.offsetHeight || 300;
        // Close if dragged down more than 25% of the drawer height or flicked fast
        if (this.y > menuHeight * 0.25) {
          handleClose();
        } else {
          // Snap smoothly back to open position
          gsap.to(menuRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        }
      },
    });

    return () => {
      draggableInstance.forEach((d) => d.kill());
    };
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99 flex items-end justify-center">
      {/* Darkened Backdrop Overlay (Click outside to close) */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Bottom Sheet Menu Drawer */}
      <div
        ref={menuRef}
        className="relative w-full h-[60svh] px-8 pt-3 pb-6 flex flex-col
                   bg-black/45 backdrop-blur-[50px] border-t border-white/20 
                   Menu rounded-t-3xl z-10 shadow-2xl"
        id="Menu"
      >
        {/* Dragger Bar (Drag down or tap to close) */}
        <div
          ref={draggerRef}
          onClick={handleClose}
          title="Drag down or tap to close"
          className="shrink-0 w-full py-2 flex justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          <div
            className="dragger w-24 h-1.5 rounded-full bg-white/80"
            id="dragger"
          />
        </div>

        {/* Scrollable Menu List */}
        <div
          className="w-full flex-1 overflow-y-auto glass-scroll mt-3 pr-1"
          data-lenis-prevent
        >
          <ul className="h-full flex flex-col gap-3">
            <Link to={"/Signin"}>
              <li
                onClick={handleClose}
                className="relative flex items-center text-white gap-3.5 p-3.5 border-b border-white/15 font-light cursor-pointer hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/30"
              >
                <i className="fa-solid fa-right-to-bracket w-5 text-center text-white/80"></i>
                <span>Sign in</span>
                <i className="fa-solid fa-angle-right ml-auto text-white/60 transition-transform duration-200 group-hover:translate-x-1"></i>
              </li>
            </Link>

            <li
              onClick={handleClose}
              className="relative flex items-center text-white gap-3.5 p-3.5 border-b border-white/15 font-light cursor-pointer hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/30"
            >
              <i className="fa-solid fa-wand-magic-sparkles w-5 text-center text-white/80"></i>
              <span>Ask AI</span>
              <i className="fa-solid fa-angle-right ml-auto text-white/60 transition-transform duration-200 group-hover:translate-x-1"></i>
            </li>

            <li
              onClick={handleClose}
              className="relative flex items-center text-white gap-3.5 p-3.5 border-b border-white/15 font-light cursor-pointer hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/30"
            >
              <i className="fa-solid fa-circle-question w-5 text-center text-white/80"></i>
              <span>FAQ</span>
              <i className="fa-solid fa-angle-right ml-auto text-white/60 transition-transform duration-200 group-hover:translate-x-1"></i>
            </li>

            <li
              onClick={handleClose}
              className="relative flex items-center text-white gap-3.5 p-3.5 border-b border-white/15 font-light cursor-pointer hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/30"
            >
              <i className="fa-solid fa-tags w-5 text-center text-white/80"></i>
              <span>Pricing</span>
              <i className="fa-solid fa-angle-right ml-auto text-white/60 transition-transform duration-200 group-hover:translate-x-1"></i>
            </li>

            <li
              onClick={handleClose}
              className="relative flex items-center text-white gap-3.5 p-3.5 border-b border-white/15 font-light cursor-pointer hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/30"
            >
              <i className="fa-solid fa-circle-info w-5 text-center text-white/80"></i>
              <span>About us</span>
              <i className="fa-solid fa-angle-right ml-auto text-white/60 transition-transform duration-200 group-hover:translate-x-1"></i>
            </li>

            <li
              onClick={handleClose}
              className="relative flex items-center text-white gap-3.5 p-3.5 border-b border-white/15 font-light cursor-pointer hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/30"
            >
              <i className="fa-solid fa-credit-card w-5 text-center text-white/80"></i>
              <span>Payments</span>
              <i className="fa-solid fa-angle-right ml-auto text-white/60 transition-transform duration-200 group-hover:translate-x-1"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeMobileMenu;
