import React from 'react'
import { useState } from 'react';

function Expenses({ toggleState, toggleMobileState, formattedDate, openCalender }) {


    const [logExpense, setLogExpense] = useState(false);

    return (
        <div className={`dashboard w-full min-h-screen p-4 
        md:p-8 ${toggleMobileState === 3 ? "block" : "hidden"}
         ${toggleState === 3 ? "md:block" : "md:hidden"}
        `}>

            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
                    Expenses
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

            <div className='okrContainer flex flex-wrap gap-4 w-full transition-all duration-300'>
                <div className='bg-[linear-gradient(135deg,#4f46e5_0%,#3730a3_100%)] shadow-[0_5px_15px_rgba(79,70,229,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span className='ml-2'>Spent This Month</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R 1 000,00</h1>
                    <h3 className='text-white/75 text-sm'>1 transaction</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#10b981_0%,#065f46_100%)] shadow-[0_5px_15px_rgba(16,185,129,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-calendar-check"></i>
                        <span className='ml-2'>Spent This Year</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R 1 000,00</h1>
                    <h3 className='text-white/75 text-sm'>1 transaction</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#f59e0b_0%,#b45309_100%)] shadow-[0_5px_15px_rgba(245,158,11,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-star"></i>
                        <span className='ml-2'>Top Category</span>
                    </h3>
                    <h1 className='text-xl font-bold'>Other</h1>
                    <h3 className='text-white/75 text-sm'>R 1,000 (100%)</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#06b6d4_0%,#0369a1_100%)] shadow-[0_5px_15px_rgba(6,182,212,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-hand-holding-dollar"></i>
                        <span className='ml-2'>Refunds & Credits</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R 0,00</h1>
                    <h3 className='text-white/75 text-sm'>0 transaction</h3>
                </div>
            </div>

            <div className='flex flex-col p-3 glass mt-6 rounded-xl gap-4 text-white w-full'>
                <h3>
                    <i className="fa-solid fa-chart-pie"></i>
                    <span className='ml-2'>Spending Breakdown by Category</span>
                </h3>
                <div className='w-full h-3 bg-gray-200 rounded-xl'></div>

                <ul className='flex flex-wrap gap-2'>
                    <li className='flex items-center gap-2 text-sm p-2 border border-white/20 rounded-xl
                    hover:-translate-y-1 transition-transform duration-300 cursor-pointer'>
                        <span className='w-3 h-3 bg-gray-200 rounded-full inline-block'></span>
                        <span>Other - R 1,000 (100%)</span>
                    </li>
                </ul>
            </div>

            <div className='flex justify-between align-center mt-6 w-full flex-wrap gap-4'>
                <h1 className='text-lg text-white'>Scheme Expenses</h1>
                <div className='flex flex-wrap gap-3'>
                    <select className='border border-white/50 rounded-xl p-2 text-white focus:outline-2 outline-white'>
                        <option className="bg-white text-gray-900">All Expenses (Year)</option>
                        <option className="bg-white text-gray-900">January</option>
                        <option className="bg-white text-gray-900">February</option>
                        <option className="bg-white text-gray-900">March</option>
                        <option className="bg-white text-gray-900">April</option>
                        <option className="bg-white text-gray-900">May</option>
                        <option className="bg-white text-gray-900">June</option>
                        <option className="bg-white text-gray-900">July</option>
                        <option className="bg-white text-gray-900">August</option>
                        <option className="bg-white text-gray-900">September</option>
                        <option className="bg-white text-gray-900">October</option>
                        <option className="bg-white text-gray-900">November</option>
                        <option className="bg-white text-gray-900">December</option>
                    </select>
                    <select className='border border-white/50 rounded-xl p-2 text-white focus:outline-2 outline-white'>
                        <option className="bg-white text-gray-900">All Categories</option>
                        <option className="bg-white text-gray-900">Refunds / Credits Only</option>
                        <option className="bg-white text-gray-900">Coffin & Casket</option>
                        <option className="bg-white text-gray-900">Catering & Groceries</option>
                        <option className="bg-white text-gray-900">Tent & Rentals</option>
                        <option className="bg-white text-gray-900">Hearse & Transport</option>
                        <option className="bg-white text-gray-900">Flowers & Decor</option>
                        <option className="bg-white text-gray-900">Grave Site & Digging</option>
                        <option className="bg-white text-gray-900">Death Certificate & Admin</option>
                        <option className="bg-white text-gray-900">Sound System & Choir</option>
                        <option className="bg-white text-gray-900">Livestock / Slaughter</option>
                        <option className="bg-white text-gray-900">Family Payout</option>
                        <option className="bg-white text-gray-900">Other</option>
                    </select>
                    <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl focus:outline-2 
                    outline-white cursor-pointer transition-colors duration-300' onClick={() => setLogExpense(true)}>
                        Log Expense
                    </button>
                </div>
            </div>

            {/* Desktop view */}
            <div className='mt-3 hidden md:block'>
                <table className='w-full text-left text-sm text-white'>
                    <thead className='text-xs uppercase text-white/65 bg-white/20 rounded-tl-xl rounded-tr-xl'>
                        <tr>
                            <th className='p-3'>Date</th>
                            <th className='p-3'>Month</th>
                            <th className='p-3'>Category</th>
                            <th className='p-3'>Description</th>
                            <th className='p-3'>Amount</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-b-white/75'>
                            <td className='p-3'>2026-06-16</td>
                            <td className='p-3'>June</td>
                            <td className='p-3'>Other</td>
                            <td className='p-3'>Tent</td>
                            <td className='p-3'>R 1,000</td>
                            <td className='p-3 flex justify-end'>
                                <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b border-b-white/75'>
                            <td className='p-3'>2026-06-16</td>
                            <td className='p-3'>June</td>
                            <td className='p-3'>Other</td>
                            <td className='p-3'>Tent</td>
                            <td className='p-3'>R 1,000</td>
                            <td className='p-3 flex justify-end'>
                                <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b border-b-white/75'>
                            <td className='p-3'>2026-06-16</td>
                            <td className='p-3'>June</td>
                            <td className='p-3'>
                                <div className='rounded-xl w-fit p-1 text-gray-500 border border-gray-00 bg-gray-200'>
                                    Other
                                </div>
                            </td>
                            <td className='p-3'>Tent</td>
                            <td className='p-3'>R 1,000</td>
                            <td className='p-3 flex justify-end'>
                                <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b border-b-white/75 font-bold'>
                            <td colSpan="100%" className='p-3'>
                                <div className='flex justify-between items-center w-full'>
                                    <span className="text-white-900">Total for Period (Net):</span>
                                    <span className="text-xs uppercase tracking-wider text-white-400">R 1 000,00</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* mobile view */}
            <div className="block md:hidden space-y-4">
                <ul className="space-y-4 p-3 bg-white rounded-xl mt-3 text-sm">
                    <li>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-900">Date</span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">2026-06-16</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Month</span>
                                <span className="text-gray-900 font-medium">
                                    June
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Category</span>
                                <span className="text-gray-900 font-medium border border-gray-300 rounded-full px-2 py-1 text-xs">
                                    Other
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Description</span>
                                <span className="text-gray-900 font-medium">
                                    Tent
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount</span>
                                <span className="text-red-900 font-medium">
                                    - R 1 000,00
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Action</span>
                                <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-900">Date</span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">2026-06-16</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Month</span>
                                <span className="text-gray-900 font-medium">
                                    June
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Category</span>
                                <span className="text-gray-900 font-medium border border-gray-300 rounded-full px-2 py-1 text-xs">
                                    Other
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Description</span>
                                <span className="text-gray-900 font-medium">
                                    Tent
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount</span>
                                <span className="text-red-900 font-medium">
                                    - R 1 000,00
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Action</span>
                                <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-900">Total for Period (Net):</span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">R 1 000,00</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>


            {logExpense &&
                <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
                bg-black/50 h-screen w-screen'>
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                    w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
                        <div className='flex justify-between align-center w-full text-white mb-4'>
                            <h1 className='text-2xl'>Log Expense</h1>
                            <p className='font-bold text-2xl cursor-pointer' onClick={() => setLogExpense(false)}>&times;</p>
                        </div>


                        <div className='mb-2 text-xs'>
                            <h4 className='text-white/85'>Description</h4>
                            <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                            focus:outline-white text-white' required placeholder='e.g. KFC for AGM Meeting' type='text' />
                        </div>
                        <div className='flex justify-between gap-4 mb-2'>
                            <div className='text-xs'>
                                <h4 className='text-white/85'>Type</h4>
                                <select className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required>
                                    <option className="bg-white text-gray-900">Expense (Outflow)</option>
                                    <option className="bg-white text-gray-900">Refund / Credit (Inflow)</option>
                                </select>
                            </div>
                        </div>

                        <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
                        hover:bg-white/30'>
                            Save
                        </button>

                    </div>
                </div>
            }

        </div>
    )
}

export default Expenses