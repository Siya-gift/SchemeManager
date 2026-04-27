import './App.css'
import { useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Draggable } from "gsap/Draggable";
import crustBg from './images/bg.png'


//tabs
import Profile from './components/Profile.jsx'
import Dashboard from './components/Dashboard.jsx'
import Overlayer from './components/Overlayer.jsx'
import SchemeMembers from './components/SchemeMembers.jsx'
import Expenses from './components/Expenses.jsx'
import Insights from './components/Insights.jsx'
import ActivityHistory from './components/ActivityHistory.jsx'
import Settings from './components/Settings.jsx'

//components
import SideBar from './components/SideBar.jsx'
import MobileNav from './components/MobileNav.jsx'
import MobileMenu from './components/MobileMenu.jsx'


// gsap
gsap.registerPlugin(Draggable)


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [calenderState, setCalenderState] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const openCalender = () => setCalenderState(!calenderState);
  const [overlayer, setOverlayer] = useState(false)

  const [toggleState, setToggleState] = useState(1);
  const [toggleMobileState, settoggleMobileState] = useState(1);

  const [value, onChange] = useState(new Date());


  return (
    <>
      {/* crusty bg */}
      {/* <div
        className='fixed inset-0 pointer-events-none z-50'
        style={{
          backgroundImage: `url(${crustBg})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply'
        }}
      /> */}


      {/* calender */}
      {calenderState && <Calendar onChange={onChange} value={value} className={`fixed top-[50%] left-[50%]
      -translate-x-1/2 -translate-y-1/2 z-999999 ${calenderState ? "block" : "hidden"}`}
        calenderState={calenderState} setCalenderState={setCalenderState} />}


      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} overlayer={overlayer} setOverlayer={setOverlayer} />
      <div className='flex overflow-hidden'>
        <SideBar toggleState={toggleState} setToggleState={setToggleState} />
        <Profile toggleState={toggleState} />
        <Dashboard toggleState={toggleState} toggleMobileState={toggleMobileState} overlayer={overlayer}
          openCalender={openCalender}
        />
        <Overlayer overlayer={overlayer} toggleMenu={toggleMenu} />
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <Expenses toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <Insights toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <ActivityHistory toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <Settings toggleState={toggleState} toggleMobileState={toggleMobileState} />
      </div>
      <MobileMenu isOpen={isOpen} toggleMobileState={toggleMobileState} toggleMenu={toggleMenu} settoggleMobileState={settoggleMobileState} />
    </>
  )
}

export default App
