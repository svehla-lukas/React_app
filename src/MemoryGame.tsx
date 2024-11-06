import React, { useEffect, useState } from 'react'

import { createPublicKey } from 'crypto'
import { css } from '@emotion/css'

const formStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`

const labelStyles = css`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`

const inputWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const inputStyles = css`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 30%;
  max-width: 300px;

  &:focus {
    border-color: #00bfa5;
    box-shadow: 0 0 8px rgba(0, 191, 165, 0.5);
  }
`

const buttonStyles = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #00bfa5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #009688;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

const getButtonStyles = () => `
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  background: yellow;
  color: black;
  width: 4rem;
  height: 4rem;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`

const containerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  padding: 2rem;
  background-color: #f5f5f5;
`

const boardStyles = css`
  display: grid;
  grid-gap: 10px;
  margin-top: 2rem;
`

type Cards = {
  id: number
  value: string
  faceUp: boolean
  solved: boolean
}

// Tento kód zajistí, že kdykoliv se cells změní
// (což znamená, že komponenta dostane nové cells jako props),
// stav cards bude aktualizován tak, aby odrážel tyto nové hodnoty.
// zakaze programatorovi pouzivat useEffect bez druheho argumentu
const useComponentDidMont = (fn: Parameters<typeof useEffect>[0]) => {
  useEffect(fn, [])
}

const BoardPlate = ({ cells }: { cells: Cards[] }) => {
  useComponentDidMont(() => {
    setCards(p => cells)
    console.log('useComp')
  })
  const [cards, setCards] = useState<Cards[]>(cells)
  const [counterCard, setCounterCard] = useState(0)
  const [lastCardId, setLastCardId] = useState(999)
  const [disableFlip, setDisableFlip] = useState(false)
  const [debug, setDebug] = useState(true)
  const [loading, setLoading] = useState(false)

  const ButtonCard = ({ myId, ...props }: { myId: number } & React.ComponentProps<'button'>) => {
    return (
      <button {...props} className={css(getButtonStyles())}>
        {props.children} {/* Display the value of the card */}
      </button>
    )
  }

  const handleButtonClick = (clickedCard: Cards) => {
    // if time test not pass return
    if (disableFlip || clickedCard.faceUp) return

    cards.every(card => card.faceUp === false) ? setCounterCard(1) : setCounterCard(counterCard + 1)

    // Find for matches of two cards that are flipped up
    const pairCard =
      cards.find(
        card =>
          card.faceUp &&
          !card.solved &&
          card.value === clickedCard.value &&
          card.id !== clickedCard.id
      )?.value ?? 'notFound'

    if (pairCard === 'notFound') {
      // Swap up card, not found twin
      // setCards(previousCards => {
      const newCard = cards.map(card => {
        if (card.id === clickedCard.id && !clickedCard.faceUp) {
          // console.log('Card was face down, now flipped up')
          setLastCardId(card.id)
          return { ...card, faceUp: true } // Swap up card
        }
        return card
      })
      // })

      // second turn => start time interval
      if (counterCard % 2 === 1) {
        setDisableFlip(true)
        handleCardFlipTimeout(clickedCard.id, lastCardId)
      }
      setCards(newCard)
    } else {
      // Found winning turn
      console.log('Found winner twin')
      setCards(previousCards => {
        return previousCards.map(cell => {
          if (cell.value === pairCard) {
            console.log(cell.value)
            return { ...cell, faceUp: true, solved: true }
          } else {
            return cell
          }
        })
      })
    }
  }

  // Function to handle flipping cards back after timeout
  const handleCardFlipTimeout = (currentCardId: number, previousCardId: number) => {
    setLoading(true)
    const flipPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Flip cards back after timeout!')
      }, 1_000)
    })
      .then(message => {
        setCards(previousCards => {
          return previousCards.map(card =>
            card.id === currentCardId || card.id === previousCardId
              ? { ...card, faceUp: false }
              : card
          )
        })
        setDisableFlip(false)
        setLoading(false)
      })
      .catch(error => {
        console.log('Error flipping cards:', error)
        setDisableFlip(false)
        setLoading(false)
      })
  }

  // DebugPanel component for displaying debug information
  const DebugPanel = ({ cell, counterCard }: { cell: Cards[]; counterCard: number }) => {
    return (
      <div>
        <h3>Debug values:</h3>
        <div>- counter: {counterCard}</div>
        <br />
        <div>- id: {cards.map(cell => cell.id).join(', ')}</div>
        <br />
        <div>- value: {cards.map(cell => cell.value).join(', ')}</div>
        <br />
        <div>- faceUp: {cards.map(cell => (cell.faceUp ? 1 : 0)).join(', ')}</div>
        <br />
        <div>- solved: {cards.map(cell => (cell.solved ? 1 : 0)).join(', ')}</div>
      </div>
    )
  }

  return (
    <div>
      <div>{loading && <div className='loading-indicator'>⏳ Flipping cards...</div>}</div>
      <div
        className={boardStyles}
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cells.length))}, 1fr)`,
        }}
      >
        {cards.map(card => (
          <ButtonCard key={card.id} onClick={() => handleButtonClick(card)} myId={card.id}>
            {card.faceUp ? card.value : ''}
          </ButtonCard>
        ))}
      </div>
      <div>
        <p></p>
        <button type='button' className={buttonStyles} onClick={p => setDebug(!debug)}>
          debug mode
        </button>
        {debug && <DebugPanel cell={cards} counterCard={counterCard} />}
      </div>
    </div>
  )
}

const generatePlayingCards = (boardSize: number): number[] => {
  // Create an array of card values (ASCII codes for 'A' to 'Z') and duplicate them
  const cardsTwins = Array.from({ length: boardSize }, (_, index) => index + 65).flatMap(value => [
    value,
    value,
  ]) // Duplicate each value

  // Shuffle the cards using Fisher-Yates algorithm
  for (let i = cardsTwins.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    // Swap cards
    ;[cardsTwins[i], cardsTwins[j]] = [cardsTwins[j], cardsTwins[i]]
  }

  return cardsTwins
}

const MemoryGame = () => {
  const [inputCell, setInputCell] = useState(5)
  const [cards, setCards] = useState([] as Cards[])
  const [counter, setCounter] = useState(0)

  const handleGenerateDataForBoard = () => {
    const gameCards = generatePlayingCards(inputCell)
    setCards(p =>
      gameCards.map((cardValue, index) => ({
        id: index,
        value: String.fromCharCode(cardValue),
        faceUp: false,
        solved: false,
      }))
    )
  }

  return (
    <div className={containerStyles}>
      <header>
        <h1>Memory Game</h1>
      </header>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (inputCell > 0) {
            handleGenerateDataForBoard()
          }
        }}
        className={formStyles} // Added form layout styles
      >
        <div className={inputWrapperStyles}>
          <label htmlFor='cellInput' className={labelStyles}>
            Set number of cells:
          </label>
          <input
            id='cellInput'
            type='number'
            onChange={e => setInputCell(p => Number(e.target.value))}
            className={inputStyles}
          />
        </div>
        <button type='submit' className={buttonStyles} onClick={() => setCounter(p => p + 1)}>
          {cards.length === 0 ? 'Play' : 'Play again'}
        </button>
        <BoardPlate key={cards.length + counter} cells={cards} />
      </form>
      <p></p>
    </div>
  )
}

export default MemoryGame
