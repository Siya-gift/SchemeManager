import React from "react";

function Profile({ toggleState, toggleMobileState, setToggleState, settoggleMobileState }) {
  return (
    <div
      className={`Profile w-full min-h-screen p-4 
        md:p-8  ${toggleMobileState === 0 ? "block" : "hidden"} 
        ${toggleState === 0 ? "md:block" : "md:hidden"}`}
    >
      <div className="hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
      </div>

      <div className="group cursor-pointer flex items-center gap-3 text-white">
        <i className="fa-solid fa-chevron-left text-[14px] transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
        <h3 onClick={() => {setToggleState(6); settoggleMobileState(6);}}>Back to Setings</h3>
      </div>


    </div>
  );
}

export default Profile;
