import './App.css'

//components
import Dashboard from './components/Dashboard.jsx'
import SideBar from './components/SideBar.jsx'
import MobileNav from './components/MobileNav.jsx'
import MobileMenu from './components/MobileMenu.jsx'

function App() {
  return (
    <>
    {/* app */}
      <div className='cointans_content relative'>
        <MobileNav />
        <div className='flex'>
          <SideBar />
          <Dashboard />
        </div>
        <MobileMenu />
      </div>
    </>
  )
}

export default App