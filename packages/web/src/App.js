import React from 'react'
import './App.css'

import SidebarWrapper from './components/SidebarWrapper'

const App = (props) => {
  return (
    <div className="App">
      <SidebarWrapper {...props} />
    </div>
  )
}

export default App
