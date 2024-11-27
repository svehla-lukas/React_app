// all - Import all members, where myModule contains all the exported bindings.

// multiple - Import multiple members.

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Clock from './clock'
import HackerType from './HackerType'
import Header from './Header'
import HomePage from './HomePage'
import MapsCZ from './MapsCZ'
import MemoryGame from './MemoryGame'
import ReactDOM from 'react-dom/client'
import TicTacToe from './gameTTT'
import Weather from './Weather'
import reportWebVitals from './reportWebVitals'

// single - Import single member.

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter basename='/React_app'>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/clock' element={<Clock />} />
      <Route path='/gameTTT' element={<TicTacToe />} />
      <Route path='/MemoryGame' element={<MemoryGame />} />
      <Route path='/HackerType' element={<HackerType />} />
      <Route path='/Weather' element={<Weather />} />
      <Route path='/MapsCZ' element={<MapsCZ />} />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
