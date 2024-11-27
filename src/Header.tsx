import { Container } from './Styles'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Clock from './clock'

const Header = () => {
  const navigate = useNavigate()

  return (
    <Container flexDirection='row'>
      <div>
        <Link to='/target-page'>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt='Navigate'
            width='100px'
            style={{ cursor: 'pointer' }}
          />
        </Link>
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

export default Header
