import React from 'react'

function Insights({ toggleState, toggleMobileState, formattedDate, openCalender }) {
  return (
    <div className={`Insights w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 4 ? "block" : "hidden"}
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
            {formattedDate}
          </h3>
          <span className='cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]'
          onClick={openCalender}>
            <i className="fa-solid fa-calendar-days"></i>
          </span>
        </div>
      </div>
      <div className='okrContainer flex flex-col md:flex-row gap-2 w-full transition-all duration-300'>
        <div className='bg-[linear-gradient(135deg,#4f46e5_0%,#3730a3_100%)] shadow-[0_5px_15px_rgba(79,70,229,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 max-w-full hover:-translate-y-1 transition-translate duration-300'>
          <h3 className='text-white/75 text-sm'>
            <i className="fas fa-users me-2"></i>
            <span className='ml-2'>Average Paying Members</span>
          </h3>
          <h1 className='text-xl font-bold'>1.0</h1>
          <h3 className='text-white/75 text-sm'>Avg. over 1 mo</h3>
        </div>
        <div className='bg-[linear-gradient(135deg,#10b981_0%,#065f46_100%)] shadow-[0_5px_15px_rgba(16,185,129,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 max-w-full hover:-translate-y-1 transition-translate duration-300'>
          <h3 className='text-white/75 text-sm'>
            <i className="fas fa-hand-holding-dollar me-2"></i>
            <span className='ml-2'>Average Payment per Person</span>
          </h3>
          <h1 className='text-xl font-bold'>R 0</h1>
          <h3 className='text-white/75 text-sm'>Expected: R 500</h3>
        </div>
        <div className='bg-[linear-gradient(135deg,#f59e0b_0%,#b45309_100%)] shadow-[0_5px_15px_rgba(245,158,11,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col justify-evenly gap-2 w-full hover:-translate-y-1 transition-translate duration-300 flex-grow'>
          <h3 className='text-white/75 text-sm'>
            <i className="fas fa-user-clock me-2"></i>
            <span className='ml-2'>Members at Risk</span>
          </h3>
          <div className='flex flex-row justify-between items-center gap-2'>
            <h1 className='text-xl font-bold'>5</h1>
            <h3 className='text-white/70 text-xl text-right'>5</h3>
          </div>

          <div className='flex flex-row justify-between items-center gap-2 '>
            <h3 className='text-white/75 text-sm'>Behind on Payments</h3>
            <h3 className='text-white/70 text-sm text-right w-full'>High Risk (3+ months behind)</h3>
          </div>
        </div>
      </div>

      <div className='w-full py-5 px-6 mt-4 glass'>
        <div className='flex justify-between gap-4 flex-col md:flex-row items-center'>
          <h3 className='text-xl text-white'>Detailed Risk Report</h3>
          <button className='bg-red-900 text-white text-md hover:bg-red-800 border-none outline-none px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto'>
            <i className="fa-solid fa-file-pdf"></i>
            <span className='ml-2'>Scheme Summary Report</span>
          </button>
        </div>
      </div>


      {/* // Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm mt-4 h-95 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Member Name</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Expected So Far</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Amount Paid</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Status / Months</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700 text-right">Amount Owed</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {[{ name: 'John Doe', expected: 'R1 000,00', paid: 'R500,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Jane Smith', expected: 'R1 200,00', paid: 'R800,00', status: '2 Months Arrears', owed: 'R400,00' },
            { name: 'Alice Johnson', expected: 'R900,00', paid: 'R300,00', status: '2 Months Arrears', owed: 'R600,00' },
            { name: 'Bob Brown', expected: 'R1 500,00', paid: 'R1 000,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Bob Brown', expected: 'R1 500,00', paid: 'R1 000,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Bob Brown', expected: 'R1 500,00', paid: 'R1 000,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Bob Brown', expected: 'R1 500,00', paid: 'R1 000,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Bob Brown', expected: 'R1 500,00', paid: 'R1 000,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Bob Brown', expected: 'R1 500,00', paid: 'R1 000,00', status: '1 Month Arrears', owed: 'R500,00' },
            { name: 'Charlie Davis', expected: 'R1 100,00', paid: 'R700,00', status: '1 Month Arrears', owed: 'R400,00' }].map((member, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-medium text-gray-900 font-semibold group-hover:text-blue-600 hover:underline transition-colors">{member.name}</td>
                <td className="px-6 py-4">{member.expected}</td>
                <td className="px-6 py-4 text-gray-900">{member.paid}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-rose-600 font-semibold font-mono">{member.owed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='footer md:col-span-3 flex grow flex-col sm:flex-row 
            justify-center items-center py-5 px-6 glass text-white mt-5'>
        <p>All rights reserved &copy; 2026 </p>
      </div>
    </div>
  )
}

export default Insights