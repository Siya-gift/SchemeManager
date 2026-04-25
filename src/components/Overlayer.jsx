import React from 'react'
import { useEffect } from 'react';

function Overlayer({ overlayer, toggleMenu }) {

  useEffect(() => {
    if (overlayer) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [overlayer]);


  const closeMobileMenu = () => { toggleMenu(false) }



  return (
    <div className={`fixed overlayer z-9 -top-1 left-0 bg-black/50 h-full w-svw ${overlayer ? "block" : "hidden"}`}
    onClick={closeMobileMenu}
    ></div>
  )
}

export default Overlayer