import React from 'react'

function Overlayer({overlayer}) {
  return (
     <div className={`overlayer absolute z-9 -top-1 left-0 bg-black/50 h-svh w-svw ${overlayer ? "block":"hidden"}`}></div>
  )
}

export default Overlayer