import React from 'react'
import RestoreButton from './UploadJsonData.jsx'

function Settings({ toggleState, toggleMobileState }) {
    return (
        <div className={`Settings w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 6 ? "block" : "hidden"}
         ${toggleState === 6 ? "md:block" : "md:hidden"}
        `}>
            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-3'>
                <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
                    Settings
                </h1>
            </div>

            <div className='w-full h-screen mb-3 transition-all duration-300 glass
            shadow-[0_5px_15px_rgba(0,0,0,0.2)] py-8 px-6'>
                <div className='flex flex-col gap-4 h-full overflow-y-auto glass-scroll pr-2'>

                    {/* General */}
                    <div className='cardS mb-3 text-white'>
                        <h1 className='text-2xl font-bold mb-4'>General</h1>

                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 
                                    6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 
                                    0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                    </svg>
                                    <p className="font-medium">Notifications</p>
                                </div>
                                <label className="inline-flex items-center cursor-pointer select-none">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-white/15 rounded-full peer ring-1 peer-focus:ring-1 peer-focus:ring-white/50 
                                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] 
                                after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white/90 after:rounded-full 
                                after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-white/50"></div>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Secure */}
                    <div className='cardS mb-3 text-white'>
                        <h1 className='text-2xl font-bold mb-4'>Secure</h1>

                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-star"></i>
                                    <p className="font-medium">Rate Service</p>
                                </div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-share-nodes"></i>
                                    <p className="font-medium">Share App</p>
                                </div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-shield-halved"></i>
                                    <p className="font-medium">Privacy Policy</p>
                                </div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-file-contract"></i>
                                    <p className="font-medium">Terms & Conditions</p>
                                </div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-envelope"></i>
                                    <p className="font-medium">Contact</p>
                                </div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>

                    {/* Account */}
                    <div className='cardS mb-3 text-white'>
                        <h1 className='text-2xl font-bold mb-4'>Account</h1>

                        <div className='flex flex-col gap-3 rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row gap-4 items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 
                                        0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                    <p className="font-medium text-white">Backup Your Data</p>
                                </div>

                                <button
                                    className="flex gap-2 items-center px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white rounded-lg 
                                    hover:bg-white/95 active:scale-95 transition-all duration-200"
                                >
                                    <i class="fa-solid fa-download"></i>
                                    <p>Download Backup File</p>
                                </button>
                            </div>
                            <div className='flex flex-row gap-3 text-white/70 text-[11px]'>
                                <i class="fa-solid fa-user-shield"></i>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text'>Why backup?</h1>
                                    <p>
                                        Your data is safely backed up to the cloud. Everything is linked to your database account. <br />
                                        When opening a new Account, you can upload your backup file to instantly recover and import data.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-3 text-white/70 text-[11px]'>
                                <i className="fa-solid fa-circle-info"></i>
                                <p>
                                    Download a copy of all your schemes, and members as a file. <br />
                                    You can use this file to restore your data later or move it to another device.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row gap-4 items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                                    <p className="font-medium text-white">Restore from Backup</p>
                                </div>

                                <div>
                                    <RestoreButton/>
                                </div>


                            </div>
                            <div className='flex flex-row gap-3 text-white/70 text-[11px]'>
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text'>Is this a new account?</h1>
                                    <p>
                                        If yes, then upload the downloaded file from <br />
                                        your previous account to keep your schemes and members.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className='flex rounded-2xl bg-white/30 w-full py-3 px-3 mb-2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <p className="font-medium">Logout</p>
                                </div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='footer md:col-span-3 flex grow flex-col sm:flex-row 
            justify-center items-center py-5 px-6 glass text-white mt-auto'>
                <p>All rights reserved &copy; 2026 </p>
            </div>
        </div>
    )
}

export default Settings