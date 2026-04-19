import React from 'react'
import luffyImg from '../images/Luffy_profile_pic.jpg';

function SideBar() {
    return (
        <div className='hidden md:block container w-170 m-5
        p-5 glass'>
            <div className='profile glass p-5 relative cursor-pointer hover:bg-white/45'>
                <div className="ppic static -top-1 left-[50%] w-30 h-30 rounded-full overflow-hidden">
                    <img src={luffyImg} className="h-full w-full object-cover" />
                </div>
                <h1 className='text-white text-3xl font-bold'>Vusi Nkosi</h1>
                <small className='text-[#abe9be]'>Scheme Owner</small>
            </div>
            <div className='glass p-5 mt-5'>
                <h3 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider opacity-70">
                    OVERVIEW
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/80 text-white cursor-pointer transition
              active-side-tab">
                        <i class="fa-solid fa-house"></i>Dashboard
                    </li>
                </ul>
                <h3 className="text-white text-sm font-semibold my-5 uppercase tracking-wider opacity-70">
                    MANAGER
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-white cursor-pointer transition">
                        <i class="fa-solid fa-layer-group"></i>Scheme & Members
                    </li>
                    <li className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-white cursor-pointer transition">
                        <i class="fa-solid fa-file-invoice"></i>Expenses
                    </li>
                    <li className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-white cursor-pointer transition">
                        <i class="fa-solid fa-chart-line"></i>Insights
                    </li>
                </ul>
                <h3 className="text-white text-sm font-semibold my-5 uppercase tracking-wider opacity-70">
                    SYSTEM
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-white cursor-pointer transition">
                        <i class="fa-solid fa-clock-rotate-left"></i>Activity History
                    </li>
                    <li className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-white cursor-pointer transition">
                        <i class="fa-solid fa-gear"></i>Settings
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar