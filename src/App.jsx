import './App.css'
import { useState } from 'react'
import crustBg from './images/bg.png'

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
      <div 
        className='fixed inset-0 pointer-events-none z-50' 
        style={{ 
          backgroundImage: `url(${crustBg})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply' 
        }}
      />

      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className='flex overflow-hidden'>
        <SideBar />
        <Dashboard />
      </div>
      <MobileMenu isOpen={isOpen} />
    </>
  )
}

export default App
