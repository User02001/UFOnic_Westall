import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import { useIcon } from './hooks/useIcons.js'
import { styles } from './styles/App.js'
import * as stylex from '@stylexjs/stylex'

const App = () => {
  const background = useIcon('light_mode_bg')

  return (
    <BrowserRouter>
      <div
        {...stylex.props(styles.appBody)}
        style={
          background?.type === 'webp' || background?.type === 'png'
            ? {
                '--app-bg-image': `url(${background.content})`,
              }
            : undefined
        }
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App