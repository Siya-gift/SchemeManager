import React from 'react'

function ActivityHistory(
  { toggleState,
    toggleMobileState,
    formattedDate,
    openCalender,
    LatestTransactions
  }
) {
  return (
    <div className={`ActivityHistory w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 5 ? "block" : "hidden"}
         ${toggleState === 5 ? "md:block" : "md:hidden"}
        `}>

      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
          Activity History
        </h1>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white mt-4 md:mt-0'>
          <h5 className='text-white/50 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
            Filter by date:
          </h5>
          <h3 className='text-light cursor-pointer hover:text-white/80 uppercase text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
            {formattedDate}
          </h3>
          <span className='cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]'
            onClick={openCalender}>
            <i className="fa-solid fa-calendar-days"></i>
          </span>
        </div>
      </div>

      <div className='glass p-6 text-white h-screen flex flex-col'>
        <h2 className='text-xl font-semibold mb-6 flex items-center gap-3 shrink-0'>
          <i className="fa-solid fa-clock-rotate-left"></i> Scheme Activity History
        </h2>
        <div className='flex-1 overflow-hidden'>
          <ul className='glass-scroll text-md h-full overflow-auto pr-2'>
            {LatestTransactions
              .map((transaction, index) => (
                <li key={index} className='flex items-center justify-between border-b border-white/10 py-3 w-full hover:bg-white/10 transition-all cursor-pointer px-2 rounded-lg hover:text-white gap-2'>

                  {/* Date: shrink-0 prevents it from getting squished, w-24 gives it a fixed base width on mobile */}
                  <p className='text-white/70 text-sm w-24 md:w-1/4 shrink-0 text-left'>
                    {transaction.occuredPeriod}
                  </p>

                  {/* Description: flex-1 takes remaining space. 'truncate' adds "..." if text is too long for mobile */}
                  <p className='text-white/90 text-sm text-left flex-1 truncate'>
                    {transaction.description}
                  </p>

                  {/* Amount: shrink-0 protects it, auto width lets it size to the number naturally */}
                  <p className='text-white/90 text-sm shrink-0 text-right whitespace-nowrap'>
                    {
                      transaction.amount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })
                    }
                  </p>

                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className='footer md:col-span-3 flex grow flex-col sm:flex-row 
      justify-center items-center py-5 px-6 glass text-white mt-6'>
        <p>All rights reserved &copy; 2026 </p>
      </div>


    </div>
  )
}

export default ActivityHistory