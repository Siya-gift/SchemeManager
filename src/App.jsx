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
      <MobileNav />
      <div className='flex overflow-hidden w-svw'>
        <SideBar />
        <Dashboard />
      </div>
      <MobileMenu />
    </>
  )
}

export default App