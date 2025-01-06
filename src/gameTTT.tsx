import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material'

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
      // <div className='Game'>
      //   <h1>Tic Tac Toe</h1>
      //   <hr />
      //   <div className='game board'>
      //     <Board numberOfSquares={9} />
      //   </div>
      //   <div className='game info'></div>
      // </div>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          // padding: 2,
        }}
      >
        <Typography variant='h4' sx={{ marginBottom: 2 }}>
          Tic Tac Toe
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 4 }} />

        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            maxWidth: '400px',
            width: '100%',
            marginBottom: 4,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Board numberOfSquares={9} />
          </Box>
        </Paper>
      </Container>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            this.setState({
              whoPlay: 'x',
              winPlayer: null,
              playersPoints: this.state.playersPoints.map(() => null),
            })
          }}
        >
          New Game
        </Button>
        <Typography variant='h5'>
          {this.state.playersPoints.includes(null) === false && this.state.winPlayer === null
            ? 'Match end: Remise'
            : this.state.winPlayer === null
            ? `Next player: ${this.state.whoPlay}`
            : `Winner is: ${this.state.whoPlay === 'x' ? 'o' : 'x'}`}
        </Typography>

        {/* Board */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[0, 3, 6].map(row => (
            <Box key={row} sx={{ display: 'flex', gap: 1 }}>
              {this.renderSquare(row)}
              {this.renderSquare(row + 1)}
              {this.renderSquare(row + 2)}
            </Box>
          ))}
        </Box>
      </Box>
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
