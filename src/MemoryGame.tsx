import {
  BoldText,
  Button,
  Container,
  GridContainer,
  Heading2,
  Heading3,
  Input,
  SquareButtonCard,
  Text,
  Text12,
  TextVisibility,
} from './Styles'
import React, { useEffect, useState } from 'react'

type Cards = {
  id: number
  value: string
  faceUp: boolean
  solved: boolean
}

const useComponentDidMount = (fn: Parameters<typeof useEffect>[0]) => {
  useEffect(fn, [])
}

const BoardPlate = ({ cells, playersNames }: { cells: Cards[]; playersNames: string[] }) => {
  useComponentDidMount(() => {
    setCards(p => cells)
  })
  const [cards, setCards] = useState<Cards[]>(cells)
  const [turnCounter, setTurnCounter] = useState(0)
  const [lastCardId, setLastCardId] = useState(999)
  const [isFlippingDisabled, setIsFlippingDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [player, setPlayer] = useState(true)
  const [scorePlayerOne, setScorePlayerOne] = useState(0)
  const [scorePlayerTwo, setScorePlayerTwo] = useState(0)

  const ButtonCard = ({ myId, ...props }: { myId: number } & React.ComponentProps<'button'>) => {
    return <SquareButtonCard {...props}>{props.children}</SquareButtonCard>
  }

  const resetScore = (cards: Cards[]) => {
    if (cards.every(card => card.faceUp === false)) {
      setTurnCounter(0)
      setScorePlayerOne(0)
      setScorePlayerTwo(0)
    }
  }

  const handleButtonClick = (clickedCard: Cards) => {
    // if time test not pass return
    if (isFlippingDisabled || clickedCard.faceUp) return
    resetScore(cards)
    setTurnCounter(turnCounter + 1)

    // Find for matches of two cards that are flipped up
    const pairCard =
      turnCounter % 2
        ? // find pair
          cards.find(
            card =>
              card.faceUp &&
              !card.solved &&
              card.value === clickedCard.value &&
              card.id !== clickedCard.id
          )?.value ?? 'notFound'
        : 'notFound'

    if (pairCard === 'notFound') {
      // Swap up actual card
      setCards(previousCards =>
        previousCards.map(card => {
          if (card.id === clickedCard.id && !clickedCard.faceUp) {
            setLastCardId(card.id)
            return { ...card, faceUp: true }
          }
          return card
        })
      )

      // if second turn, start time interval
      if (turnCounter % 2) {
        setIsFlippingDisabled(true)
        handleCardFlipTimeout(clickedCard.id, lastCardId)
      }
    } else {
      // Found winning twin
      setCards(previousCards => {
        return previousCards.map(cell => {
          if (cell.value === pairCard) {
            player ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1)
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
    setPlayer(p => !p)
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
        setIsFlippingDisabled(false)
        setLoading(false)
      })
      .catch(error => {
        setIsFlippingDisabled(false)
        setLoading(false)
      })
  }

  return (
    <div>
      <Container flexDirection='row'>
        <Container>
          <TextVisibility visibility={loading ? 'visible' : 'hidden'}>⏳ Loading...</TextVisibility>
          <Text12>{player ? playersNames[0] : playersNames[1]}</Text12>
          <GridContainer columns={Math.ceil(Math.sqrt(cells.length))}>
            {cards.map(card => (
              <ButtonCard
                key={card.id}
                onClick={() => {
                  handleButtonClick(card)
                }}
                myId={card.id}
              >
                {card.faceUp ? card.value : ''}
              </ButtonCard>
            ))}
          </GridContainer>
        </Container>
        <Container>
          <Heading3>Score:</Heading3>
          <Text>
            {playersNames[0]} : {scorePlayerOne}
          </Text>
          <Text>
            {playersNames[1]} : {scorePlayerTwo}
          </Text>
        </Container>
      </Container>
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
  const [namePlayerOne, setNamePlayerOne] = useState('player 1')
  const [NamePlayerTwo, setNamePlayerTwo] = useState('player 2')

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
    <Container>
      <Heading2>Memory Game</Heading2>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (inputCell > 0) {
            handleGenerateDataForBoard()
          }
        }}
      >
        <GridContainer columns={2}>
          <Container>
            <Heading3>Set pairs:</Heading3>
            <Input
              id='cellInput'
              min={2}
              max={30}
              value={inputCell}
              type='number'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputCell(Number(e.target.value))
              }
            />
            <Button
              type='submit'
              onClick={() => {
                setCounter(p => p + 1)
              }}
            >
              {cards.length === 0 ? 'Play' : 'Play again'}
            </Button>
          </Container>
          <Container>
            <Heading3>Set players names</Heading3>
            <Input
              id='cellInput'
              value={namePlayerOne}
              type='string'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNamePlayerOne(e.target.value)
              }
            ></Input>
            <Input
              id='cellInput'
              value={NamePlayerTwo}
              type='string'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNamePlayerTwo(e.target.value)
              }
            ></Input>
          </Container>
        </GridContainer>
        <BoardPlate
          key={cards.length + counter}
          cells={cards}
          playersNames={[namePlayerOne, NamePlayerTwo]}
        />
      </form>
    </Container>
  )
}

export default MemoryGame
