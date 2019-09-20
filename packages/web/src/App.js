import React from 'react'
import './App.css'

import SidebarWrapper from './components/SidebarWrapper'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SidebarWrapper {...props} />
      </div>
    </ThemeProvider>
  )
}

export default App
