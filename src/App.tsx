// single - Import single member.

import { Link } from 'react-router-dom'
import Clock from './clock'
import Weather from './Weather'
import logo from './logo.png'

// all - Import all members, where myModule contains all the exported bindings.

// multiple - Import multiple members.

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'Gainsboro',
        border: 'black',
        fontSize: '1rem',
      }}
    >
      <div>
        <img src={logo} width={'100px'}></img>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/gameTTT'>Tic tac toe</Link>
            </li>
            <li>
              <Link to='/MemoryGame'>Memory game</Link>
            </li>
            <li>
              <Link to='/HackerType'>HackerType</Link>
            </li>
            <li>
              <Link to='/Weather'>Weather</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Clock />
      </div>
    </div>
  )
}

export default App
