import './App.css'
import { useState } from 'react'
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [overlayer, setOverlayer] = useState(false)

  const [toggleState, setToggleState] = useState(1);
  const [toggleMobileState, settoggleMobileState] = useState(1);

  return (
    <>
      {/* crusty bg */}
      <div
        className='fixed inset-0 pointer-events-none z-50'
        style={{
          backgroundImage: `url(${crustBg})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply'
        }}
      />


      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} overlayer={overlayer} setOverlayer={setOverlayer} />
      <div className='flex overflow-hidden'>
        <SideBar toggleState={toggleState} setToggleState={setToggleState} />
        <Profile toggleState={toggleState} />
        <Dashboard toggleState={toggleState} toggleMobileState={toggleMobileState} overlayer={overlayer} />
        <Overlayer overlayer={overlayer}/>
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <Expenses toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <Insights toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <ActivityHistory toggleState={toggleState} toggleMobileState={toggleMobileState} />
        <Settings toggleState={toggleState} toggleMobileState={toggleMobileState} />
      </div>
      <MobileMenu isOpen={isOpen} toggleMobileState={toggleMobileState} settoggleMobileState={settoggleMobileState} />
    </>
  )
}

export default App
