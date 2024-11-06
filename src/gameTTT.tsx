import React from 'react'

type gameSign = null | 'x' | 'o'

function calculateWinner(playersPoints: gameSign[]) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  return winLines
    .map(line =>
      playersPoints[line[0]] === playersPoints[line[1]] &&
      playersPoints[line[0]] === playersPoints[line[2]]
        ? playersPoints[line[0]]
        : null
    )
    .find(winner => winner === 'x' || winner === 'o') === undefined
    ? null
    : 'x'
}

class TicTacToe extends React.Component {
  render() {
    return (
      <div className='Game'>
        <h1>XoXoXoXoX --- tic tac toe --- xOxOxOxOx</h1>
        <hr />
        <div className='game board'>
          <Board numberOfSquares={9} />
        </div>
        <div className='game info'></div>
      </div>
    )
  }
}

// just BOARD can have states!!!!

type PropsBoard = {
  numberOfSquares: number
}
type StateBoard = {
  whoPlay: gameSign
  playersPoints: gameSign[]
  winPlayer: gameSign
  debugCounter: number
}
class Board extends React.Component<PropsBoard, StateBoard> {
  constructor(props: PropsBoard) {
    super(props)
    this.state = {
      whoPlay: 'x',
      playersPoints: Array.from({ length: this.props.numberOfSquares }).map((item, index) => null),
      winPlayer: null,
      debugCounter: 0,
    }
  }

  handleClick = (squareIndex: number) => {
    if (this.state.playersPoints[squareIndex] || this.state.winPlayer) {
      return
    }
    // create copy of players points - avoid mutate
    const copyPlayersPoints = [...this.state.playersPoints]
    copyPlayersPoints[squareIndex] = this.state.whoPlay
    //  Update with new array
    this.setState({
      playersPoints: copyPlayersPoints,
      winPlayer: calculateWinner(copyPlayersPoints),
      whoPlay: this.state.whoPlay === 'x' ? 'o' : 'x',
    })
  }

  renderSquare = (index: number) => {
    // first props change displayed value in square
    // second props update value in result table
    return (
      <Square
        state={this.state.playersPoints[index]}
        onClickOut={() => {
          this.handleClick(index)
        }}
      />
    )
  }

  render() {
    return (
      <div>
        <div className='status'>
          <h2>
            {this.state.playersPoints.includes(null) === false && this.state.winPlayer === null
              ? 'Match end: Remise'
              : this.state.winPlayer === null
              ? ['Next player: ', '', this.state.whoPlay]
              : ['Winner is: ', '', this.state.whoPlay === 'x' ? 'o' : 'x']}
          </h2>
        </div>
        <div className='board-head'>
          <p>
            <button
              onClick={() => {
                this.setState({
                  whoPlay: 'x',
                  winPlayer: null,
                  playersPoints: this.state.playersPoints.map(() => null),
                })
              }}
            >
              New Game
            </button>
          </p>
        </div>
        <div
          className='board-row'
          style={{
            display: 'flex',
          }}
        >
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div
          className='board-row'
          style={{
            display: 'flex',
          }}
        >
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div
          className='board-row'
          style={{
            display: 'flex',
          }}
        >
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

type PropsSquare = {
  onClickOut: any
  state: gameSign
}

// type StateSquare = {}
class Square extends React.Component<PropsSquare> {
  render() {
    return (
      <button
        className='square'
        onClick={() => {
          this.props.onClickOut()
        }}
        style={{
          background: '#fff',
          fontSize: 30,
          textAlign: 'center',
          lineHeight: 0,
          height: 40,
          width: 40,
        }}
      >
        {this.props.state}
      </button>
    )
  }
}

export default TicTacToe
