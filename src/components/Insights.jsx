import React from 'react'

function Insights({ toggleState, toggleMobileState }) {
  return (
    <div className={`Insights w-full min-h-screen p-4 
        md:p-8 ${toggleMobileState === 4 ? "block" : "hidden"}
         ${toggleState === 4 ? "md:block" : "md:hidden"}
        `}>

      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
          Insights
        </h1>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white mt-4 md:mt-0'>
          <h5 className='text-white/50 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
            Filter by date:
          </h5>
          <h3 className='text-light cursor-pointer hover:text-white/80 uppercase text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
            20 April 2026
          </h3>
          <span className='cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]'>
            <i className="fa-solid fa-calendar-days"></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Insights