import React from 'react'

function Profile({toggleState}) {
  return (
    <div className={`Profile w-full min-h-screen p-4 
        md:p-8  ${toggleState === 0 ? "md:block" : "hidden"}`}>

      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6'>
        <h1 className='text-3xl font-bold text-white'>Profile</h1>
      </div>
    </div>
  )
}

export default Profile