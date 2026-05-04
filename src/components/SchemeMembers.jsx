import React from 'react'

function SchemeMembers({ toggleState, toggleMobileState }) {
  return (
    // Fixed w-vh to w-full. min-h-screen ensures it covers the viewport.
    <div className={`schemeMembers w-full min-h-screen p-4 md:p-8 
        ${toggleMobileState === 2 ? "block" : "hidden"} 
        ${toggleState === 2 ? "md:block" : "md:hidden"}
        `}>

      {/* Header: Stacks on mobile, side-by-side on md+ */}
      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
          Scheme & Members
        </h1>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white'>
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

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-4'>
        <div className='glass p-6 text-white flex flex-col h-auto md:col-span-1'>
          <div className='flex justify-between items-center py-4'>
            <h1 className='font-bold text-xl'>Your Schemes</h1>
            <span className='text-2xl cursor-pointer'>
              <i className="fa-solid fa-circle-plus"></i>
            </span>
          </div>

          <ul className='grow min-h-25 overflow-y-auto glass-scroll'>
            {[
              { scheme: "clubs" }

            ].map((item, idx) => (
              <li key={idx} className='py-5 px-10 bg-white/30 border cursor-pointer hover:bg-white/40
              my-2 rounded-xl mr-1.5'>
                <div className='flex justify-between items-center'>
                  <div className='flex justify-between flex-col max-w-[20%]'>
                    <h3 className='text-md font-bold'>{item.scheme}</h3>
                    <p className='text-[11px] text-white/70'>R500/mo</p>
                  </div>
                  <div className='flex gap-3 flex-end text-[11px]'>
                    <span className='px-2 py-2 border rounded-lg'>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </span>
                    <span className='px-2 py-2 border rounded-lg'>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
                </div>


              </li>
            ))}


          </ul>
        </div>
        <div className='glass p-6 text-white flex flex-col min-h-svh md:col-span-2'>
          <div className='flex justify-between items-center flex-col md:flex-row'>
            <h1 className='font-bold text-xl mb-4 md:mb-0 xl:w-[20%]'>Members of club now</h1>
            <div className='flex flex-col xl:flex-row gap-3 mx-auto w-full'>
              <input className='py-2.5 px-5 border rounded-xl w-full focus:border-white focus:outline-white' type='text' placeholder='Search Members...' />
              <button className='bg-white/30 px-5 py-2.5 w-full border rounded-xl cursor-pointer hover:bg-white/45'>
                <i className="fa-solid fa-plus"></i> Add Member
              </button>
            </div>



          </div>

          <ul className='flex p-6 w-full mt-9'>
            <div className="w-full overflow-x-auto">
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className="border-b text-white-500 uppercase text-sm">
                    <th className="py-4 px-2">Name</th>
                    <th className="py-4 px-2">Total Paid</th>
                    <th className="py-4 px-2">Status</th>
                    <th className="py-4 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-white/30 transition-colors">
                    {/* py-4 and align-middle handle vertical spacing/alignment */}
                    <td className="py-4 px-2 align-middle font-medium">Siya</td>
                    <td className="py-4 px-2 align-middle">R 300.00</td>
                    <td className="py-4 px-2 align-middle">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="py-4 px-2 align-middle text-right">
                        <span className='px-2 py-2  mr-3'>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                        <span className='px-2 py-2'>
                          <i className="fa-solid fa-trash"></i>
                        </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ul>
        </div>
        <div className='footer md:col-span-3 flex flex-col sm:flex-row justify-center items-center py-5 px-6 glass text-white'>
          <p>All rights reserved &copy; 2026 </p>
        </div>
      </div>

    </div>
  )
}

export default SchemeMembers
