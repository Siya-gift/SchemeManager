import React from 'react'
import { useEffect } from 'react';

function Overlayer({ overlayer }) {

  useEffect(() => {
    if (overlayer) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [overlayer]);



  return (
    <div className={`fixed overlayer z-9 -top-1 left-0 bg-black/50 h-full w-svw ${overlayer ? "block" : "hidden"}`}></div>
  )
}

export default Overlayer