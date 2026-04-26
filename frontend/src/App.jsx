import React from 'react'
import Dashboard from './pages/Dashboard'
import SideBar from './components/Sidebar'
import Navbar from './components/Navbar'


function App() {

  return (
    <div className='h-screen flex overflow-hidden'>
      <div className='hidden md:flex'>
        <SideBar />
      </div>
      <Dashboard />
    </div>
  )
}

export default App