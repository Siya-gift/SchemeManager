import React from 'react'

function Settings({ toggleState, toggleMobileState }) {
    return (
        <div className={`Settings w-full min-h-screen p-4 
        md:p-8 ${toggleMobileState === 6 ? "block" : "hidden"}
         ${toggleState === 6 ? "md:block" : "md:hidden"}
        `}>
            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6'>
                <h1 className='text-3xl font-bold text-white'>Settings</h1>
                
            </div>
        </div>
    )
}

export default Settings