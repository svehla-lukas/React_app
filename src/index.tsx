import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Clock from './clock'
import HackerType from './HackerType'
import HomePage from './HomePage'
import MainLayout from './MainLayout'
import MapsCZ from './MapsCZ'
import MemoryGame from './MemoryGame'
import Models3D from './Models3D'
import MortgageCalculator from './MortgageCalculator'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import TicTacToe from './gameTTT'
import Weather from './Weather'
import reportWebVitals from './reportWebVitals'
import theme from './theme'

// import Models3D from './Models3D'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename='/React_app'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='clock' element={<Clock />} />
          <Route path='gameTTT' element={<TicTacToe />} />
          <Route path='MemoryGame' element={<MemoryGame />} />
          <Route path='HackerType' element={<HackerType />} />
          <Route path='Weather' element={<Weather />} />
          <Route path='MapsCZ' element={<MapsCZ />} />
          <Route path='Models3D' element={<Models3D />} />
          <Route path='MortgageCalculator' element={<MortgageCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

reportWebVitals()
