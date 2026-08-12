import React from 'react'

function Settings({ toggleState, toggleMobileState }) {
    return (
        <div className={`Settings w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 6 ? "block" : "hidden"}
         ${toggleState === 6 ? "md:block" : "md:hidden"}
        `}>
            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
                    Settings
                </h1>
            </div>

            <div className='footer md:col-span-3 flex grow flex-col sm:flex-row 
            justify-center items-center py-5 px-6 glass text-white mt-auto'>
                <p>All rights reserved &copy; 2026 </p>
            </div>
        </div>
    )
}

export default Settings