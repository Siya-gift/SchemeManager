import React from 'react'

function Dashboard() {
    return (
        <div className='dashboard min-h-screen p-4 md:p-8 md:block'>
            {/* Header Stays full width */}
            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6'>
                <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
                <div className='flex gap-4 text-white mt-4 md:mt-0'>
                    <h5 className='text-white/30'>Filter by date:</h5>
                    <h3 className='text-light cursor-pointer hover:text-white/80 uppercase'>20 April 2026</h3>
                    <span className='cursor-pointer hover:text-white/80'><i className="fa-solid fa-calendar-days"></i></span>
                </div>
            </div>

            {/* Tabs Scrollable on mobile */}
            <ul className='tabs flex gap-2 overflow-x-auto pb-4 no-scrollbar'>
                <li className='tab hover:bg-white/45 cursor-pointer text-white glass rounded-2xl px-4 py-1.5 font-bold text-sm whitespace-nowrap transition-all'>VV</li>
                <li className='tab hover:bg-white/45 cursor-pointer text-white glass rounded-2xl px-4 py-1.5 font-bold text-sm whitespace-nowrap transition-all bg-white/45'>Clubs</li>
                <li className='tab hover:bg-white/45 cursor-pointer text-white glass rounded-2xl px-4 py-1.5 font-bold text-sm whitespace-nowrap transition-all'>Scheme2</li>
                <li className='group flex items-center tab hover:bg-white/20 cursor-pointer text-white glass rounded-2xl px-4 py-1.5 font-bold text-sm transition-all'>
                    <span><i className="fa-solid fa-plus"></i></span>
                    <span className='max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs
                     group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 
                     ease-in-out whitespace-nowrap'>
                        Create Scheme
                    </span>
                </li>
            </ul>
            {/* Container */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 '>

                {/* Card 1: Total Collections (Spans 1 col) */}
                {/* Card 1: Allow it to be wider if needed */}

                <div className='glass p-6 text-white flex flex-col justify-between min-h-62.5 md:col-span-1 lg:col-span-1'>
                    <h2 className='text-[clamp(1rem,2.5vw,1rem)] flex items-start gap-3'>
                        <i className="fa-solid fa-wallet mt-1"></i>
                        <span>Total collections(YTD) - Monthly Expenses</span>
                    </h2>
                    <div className='mt-4'>
                        <h1 className="text-[clamp(2rem,10vw,3rem)] font-bold leading-none whitespace-nowrap">
                            R -370
                        </h1>
                        <h4 className='text-sm text-white/70 mt-2 cursor-pointer hover:text-white transition-all'>
                            Spent This Month <span className='ml-2'>&rarr;</span>
                        </h4>
                    </div>
                </div>

                {/* Card 2: Yearly Target (Spans 2 cols on large screens) ...*/}
                <div className='glass p-6 text-white md:col-span-2 flex flex-col justify-between min-h-62.5'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                        <h2 className='text-xl flex items-center gap-3'>
                            <i className="fa-solid fa-piggy-bank"></i>
                            Total Collected This Year
                        </h2>
                        <ul className='border flex items-center text-xs overflow-hidden rounded'>
                            <li className='bg-white/40 px-3 py-1.5 cursor-pointer hover:bg-white/60'>YEAR</li>
                            <li className='w-px h-4 bg-white/50'></li>
                            <li className='px-3 py-1.5 cursor-pointer hover:bg-white/20'>MONTH</li>
                        </ul>
                    </div>

                    <h1 className='text-[clamp(2rem,10vw,3rem)] font-bold my-4'>R 40 000.00</h1>

                    <div className='space-y-4'>
                        <ul className='flex flex-wrap gap-4 text-xs opacity-80'>
                            <li><i className="fa-solid fa-money-bill-wave mr-2"></i>Cash: R25k</li>
                            <li><i className="fa-solid fa-building-columns mr-2"></i>EFT: R5k</li>
                            <li><i className="fa-solid fa-wallet mr-2"></i>Other: R10k</li>
                        </ul>
                        <div className='w-full h-2 bg-white/20 rounded-full overflow-hidden'>
                            <div className='h-full bg-white w-[40%]'></div>
                        </div>
                        <h5 className='text-xs font-bold'>Target: R 100 000</h5>
                    </div>
                </div>

                {/* Card 3: Latest Transactions */}
                <div className='glass p-6 text-white'>
                    <h2 className='text-xl font-semibold mb-6 flex items-center gap-3'>
                        <i className="fa-solid fa-clock-rotate-left"></i> Latest Transactions
                    </h2>
                    <ul className=' text-sm'>
                        {[
                            { d: '18 Feb 26', c: 'Expense', v: 'R 500' },
                            { d: '18 Feb 26', c: 'Payment', v: 'R 500' },
                            { d: '18 Feb 26', c: 'New Scheme', v: 'Scheme2' },
                            { d: '18 Feb 26', c: 'New Member', v: 'Sive' }
                        ].map((item, i) => (
                            <li key={i} className='flex justify-between items-center border-b border-white/10 py-5 
                            hover:bg-white/20 h-full cursor-pointer'>
                                <span className='opacity-70'>{item.d}</span>
                                <span className='font-medium'>{item.c}</span>
                                <span className='font-bold'>{item.v}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 4: Arrears */}
                <div className='glass p-6 text-white'>
                    <h2 className='text-xl font-semibold mb-6 flex items-start gap-3'>
                        <i className='fa-solid fa-triangle-exclamation text-yellow-400'></i>
                        <span>Members Behind on Payment</span>
                    </h2>
                    <ul className='text-sm'>
                        {[1, 2, 3].map((_, i) => (
                            <li key={i} className='flex justify-between items-center border-b border-white/10 py-4
                            hover:bg-white/20 cursor-pointer'>
                                <span className='opacity-70'>18 Feb 26</span>
                                <span className='font-medium'>Expense</span>
                                <span className='text-red-300 font-bold'>R 500</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 5: Helpful tips to navigate seemlessly */}
                <div className='glass p-6 text-white'>
                    <h2 className='text-xl font-semibold mb-6 flex items-center gap-3'>
                        <i class="fa-solid fa-lightbulb"></i> Helpful Tips
                    </h2>
                    <ul>
                        <li className='flex gap-3'><p>*</p>
                            <p>Create new Scheme using the plus sign</p>
                        </li>
                        <li className='flex gap-3'><p>*</p>
                            <p>Change the Month & Year to look at past
                                or future payment records.</p>
                        </li>
                        <li className='flex gap-3'><p>*</p>
                            <p>Click on a member's name to see their
                                full payment history.</p>
                        </li>
                        <li className='flex gap-3'><p>*</p>
                            <p>Click on any entry in the Activity
                                History to see exactly what details were changed.</p>
                        </li>
                        <li className='flex gap-3'><p>*</p>
                            <p>Use the PDF Statement or Scheme Summary
                                buttons to generate professional reports for sharing.</p>
                        </li>
                        <li className='flex gap-3'><p>*</p>
                            <p>Check the Insights tab to see which members
                                may need a reminder to pay.</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='hearder flex flex-col sm:flex-row justify-center items-center py-5 px-6 glass mb-6 text-white'>
                <p>All rights reserved &copy; 2026 </p>
            </div>
        </div>
    )
}

export default Dashboard