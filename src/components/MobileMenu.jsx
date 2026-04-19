import React from 'react'

function MobileMenu() {
    return (
        // fixed position incoming, it's hidden for now
        <div className='hidden bottom-0 Menu max-h-[40svh] overflow-y-auto w-full bg-white/30 glass z-2 px-10 py-2 '>
            <div className='sticky top-2 dragger w-40 h-2 mx-auto rounded-md bg-white mb-15'></div>
            <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>OVERVIEW</h3>
            <ul>
                <li className='flex items-center text-white gap-3 p-3 font-light'>
                    <i class="fa-solid fa-house"></i>Dashboard
                </li>
            </ul>
            <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>MANAGER</h3>
            <ul>
                <li className='flex items-center text-white gap-3 p-3 border-b font-light'>
                    <i class="fa-solid fa-layer-group"></i>Scheme & Members
                </li>
                <li className='flex items-center text-white gap-3 p-3 border-b font-light'>
                    <i class="fa-solid fa-file-invoice"></i>Expenses
                </li>
                <li className='flex items-center text-white gap-3 p-3 font-light'>
                    <i class="fa-solid fa-chart-line"></i>Insights
                </li>
            </ul>
            <h3 className='text-[clamp(1rem,2.5vw,1rem)] font-semibold text-white/70 my-3'>SYSTEM</h3>
            <ul>
                <li className='flex items-center text-white gap-3 p-3 font-light'>
                    <i class="fa-solid fa-clock-rotate-left"></i>Activity History
                </li>
                <li className='flex items-center text-white gap-3 p-3 font-light'>
                    <i class="fa-solid fa-gear"></i>Settings
                </li>
            </ul>
        </div>
    )
}

export default MobileMenu