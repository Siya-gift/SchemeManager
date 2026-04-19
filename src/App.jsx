import './App.css'
import { useState } from 'react'

//components
import Dashboard from './components/Dashboard.jsx'
import SideBar from './components/SideBar.jsx'
import MobileNav from './components/MobileNav.jsx'
import MobileMenu from './components/MobileMenu.jsx'

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* app */}
      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className='flex overflow-hidden '>
        <SideBar />
        <Dashboard />
      </div>
      <MobileMenu isOpen={isOpen} />
    </>
  )
}

export default App