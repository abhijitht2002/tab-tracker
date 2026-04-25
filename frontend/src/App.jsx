import React from 'react'
import Dashboard from './pages/Dashboard'
import SideBar from './components/Sidebar'


function App() {

  return (
    <div className='h-screen flex overflow-hidden'>
      <SideBar />
      <Dashboard />
    </div>
  )
}

export default App