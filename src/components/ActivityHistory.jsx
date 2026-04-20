import React from 'react'

function ActivityHistory({toggleState, toggleMobileState}) {
  return (
    <div className={`ActivityHistory w-full min-h-screen p-4 
        md:p-8 ${toggleMobileState === 5 ? "block" : "hidden"}
         ${toggleState === 5 ? "md:block" : "md:hidden"}
        `}>
      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6'>
        <h1 className='text-3xl font-bold text-white'>Activity History</h1>
        <div className='flex gap-4 text-white mt-4 md:mt-0'>
          <h5 className='text-white/50'>Filter by date:</h5>
          <h3 className='text-light cursor-pointer hover:text-white/80 uppercase'>20 April 2026</h3>
          <span className='cursor-pointer hover:text-white/80'><i className="fa-solid fa-calendar-days"></i></span>
        </div>
      </div>
    </div>
  )
}

export default ActivityHistory