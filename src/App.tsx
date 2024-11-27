// single - Import single member.

import { Container } from './Styles'
import { Link } from 'react-router-dom'
import Clock from './clock'
import logo from './logo.png'

const App = () => {
  return (
    <Container flexDirection='row'>
      <div>
        <img src={logo} width={'100px'}></img>
      </div>
      <Container>
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
              <Link to='/MapsCZ'>Maps CZ - API</Link>
            </li>
            <li>
              <Link to='/Weather'>Weather - API</Link>
            </li>
          </ul>
        </nav>
      </Container>
      <div>
        <Clock />
      </div>
    </Container>
  )
}

export default App
