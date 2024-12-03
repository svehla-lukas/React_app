import { Container, TransparentContainer } from './Styles'

import { Link } from 'react-router-dom'
import Clock from './clock'

const Header = () => {
  return (
    <Container flexDirection='row'>
      <div>
        <Link to='/'>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt='Navigate'
            width='100px'
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </div>
      <Container flexDirection='row'>
        <nav>
          <ul>
            <li>
              <Link to='gameTTT'>Tic tac toe</Link>
            </li>
            <li>
              <Link to='MemoryGame'>Memory game</Link>
            </li>
            <li>
              <Link to='HackerType'>HackerType</Link>
            </li>
            <li>
              <Link to='MortgageCalculator'>Mortgage Calculator</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <Link to='MapsCZ'>Maps CZ - API</Link>
            </li>
            <li>
              <Link to='Weather'>Weather - API</Link>
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

export default Header
