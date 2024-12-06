import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Bondster from './Bondster'
import Clock from './clock'
import HackerType from './HackerType'
import Header from './Header'
import HomePage from './HomePage'
import MapsCZ from './MapsCZ'
import MemoryGame from './MemoryGame'
import MortgageCalculator from './MortgageCalculator'
import ReactDOM from 'react-dom/client'
import Regulators from './Regulators'
import TicTacToe from './gameTTT'
import Weather from './Weather'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter basename='/React_app'>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='clock' element={<Clock />} />
      <Route path='gameTTT' element={<TicTacToe />} />
      <Route path='MemoryGame' element={<MemoryGame />} />
      <Route path='HackerType' element={<HackerType />} />
      <Route path='Weather' element={<Weather />} />
      <Route path='MapsCZ' element={<MapsCZ />} />
      <Route path='MortgageCalculator' element={<MortgageCalculator />} />
      <Route path='Bondster' element={<Bondster />} />
      <Route path='Regulators' element={<Regulators />} />
    </Routes>
  </BrowserRouter>
)

reportWebVitals()
