import React from 'react'
import luffyImg from '../images/Luffy_profile_pic.jpg';

function MobileNav() {

    let openMenu = () => {
        console.log("open")
    }


    return (
        <>
            <div className='sticky top-2 z-1'>
                <div className='profile bg-blue glass flex md:hidden justify-between items-center m-5
                 p-3 cursor-pointer hover:bg-white/45'>
                    <div className='pp'>
                        <div className="ppic static -top-1 left-[50%] w-10 h-10 rounded-full overflow-hidden">
                            <img src={luffyImg} className="h-full w-full object-cover" />
                        </div>
                        <h1 className='text-white text-3xl font-bold'>Vusi Nkosi</h1>
                        <small className='text-[#abe9be]'>Scheme Owner</small>
                    </div>
                    <div className='burger w-6.25' onClick={openMenu}>
                        <div className='line1 h-0.75 w-full bg-white rounded-sm'></div>
                        <div className='line2 h-0.75 w-full bg-white rounded-sm mt-1.25'></div>
                        <div className='line3 h-0.75 w-full bg-white rounded-sm mt-1.25'></div>
                    </div>
                </div>
            </div>

            
        </>


    )
}

export default MobileNav