import { fireEvent, render, screen } from '@testing-library/react'

import React from 'react'
import TicTacToe from './gameTTT'

test('plays a quick winning sequence and shows the winner', () => {
  render(<TicTacToe />)

  // find all the square buttons (face-down squares render empty text)
  const squares = screen.getAllByRole('button').filter(b => b.textContent === '')

  // click 0,1 for X, then 3,4 for O, then 2 for X to win top row
  fireEvent.click(squares[0]) // X
  fireEvent.click(squares[3]) // O
  fireEvent.click(squares[1]) // X
  fireEvent.click(squares[4]) // O
  fireEvent.click(squares[2]) // X wins

  expect(screen.getByText(/Winner is: x/i)).toBeInTheDocument()
})

test('plays a quick winning sequence and shows the winner', () => {
  render(<TicTacToe />)

  // find all the square buttons (face-down squares render empty text)
  const squares = screen.getAllByRole('button').filter(b => b.textContent === '')

  // click 0,1 for X, then 3,4 for O, then 2 for X to win top row
  fireEvent.click(squares[0]) // X
  fireEvent.click(squares[3]) // O
  fireEvent.click(squares[1]) // X
  fireEvent.click(squares[4]) // O
  fireEvent.click(squares[7]) // X
  fireEvent.click(squares[5]) // O wins

  expect(screen.getByText(/Winner is: o/i)).toBeInTheDocument()
})

test('plays a quick winning sequence and shows the winner', () => {
  render(<TicTacToe />)

  // find all the square buttons (face-down squares render empty text)
  const squares = screen.getAllByRole('button').filter(b => b.textContent === '')

  // click 0,1 for X, then 3,4 for O, then 2 for X to win top row
  fireEvent.click(squares[0]) // X
  fireEvent.click(squares[2]) // O
  fireEvent.click(squares[1]) // X
  fireEvent.click(squares[3]) // O
  fireEvent.click(squares[5]) // X
  fireEvent.click(squares[4]) // O
  fireEvent.click(squares[6]) // X
  fireEvent.click(squares[7]) // O
  fireEvent.click(squares[8]) // X

  expect(screen.getByText(/Match end: Remise/i)).toBeInTheDocument()
})
