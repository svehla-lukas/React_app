// all - Import all members, where myModule contains all the exported bindings.

// multiple - Import multiple members.
import { BrowserRouter, Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// single - Import single member.
import App from './App'
import Clock from './clock'
import HackerType from './HackerType'
import MemoryGame from './MemoryGame'
import ReactDOM from 'react-dom/client'
import TicTacToe from './gameTTT'
import Weather from './Weather'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path='/clock' element={<Clock />} />
      <Route path='/gameTTT' element={<TicTacToe />} />
      <Route path='/MemoryGame' element={<MemoryGame />} />
      <Route path='/HackerType' element={<HackerType />} />
      <Route path='/Weather' element={<Weather />} />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
