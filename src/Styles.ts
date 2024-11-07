// weatherStyles.ts
/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'

// --- CONTAINERS ---
export const Container = styled.div<{ flexDirection?: string }>`
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
  align-items: center;
`
export const GridContainer = styled.div<{ columns?: number }>`
  display: grid;
  grid-gap: 10px;
  margin-top: 2rem;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const WeatherContainer = styled.div`
  display: flex;
  align-items: center; /* Center items vertically within the row */
  justify-content: center;
  flex-direction: row; /* Align items horizontally */
  gap: 10px; /* Adjust spacing between elements */
  margin-top: 10px;
`
// --- Headers ---

export const Heading2 = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`
export const Heading3 = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`
// --- TEXT ---

export const OrangeText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #e67e22;
  margin: 0;
`

export const Text = styled.p`
  font-size: 1rem;
  color: #555;
`

export const Text12 = styled.p`
  font-size: 1.2rem;
  color: #555;
`
export const Text14 = styled.p`
  font-size: 1.4rem;
  color: #555;
`

export const BoldText = styled.p`
  font-size: 1rem;
  color: #555;
  font-weight: bold;
`
export const LoadingPlaceholder = styled.div<{ loading: boolean }>`
  visibility: ${({ loading }) => (loading ? 'visible' : 'hidden')};
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`

export const Description = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #666;
  text-transform: capitalize;
`

export const ExtraInfo = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
`

//  --- ICONS ---
export const Icon = styled.img`
  width: 80px;
  height: 80px;
`

//  --- Buttons ---
export const Button = styled.button<{ background?: string; color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 5px;
  background: ${({ background = 'lightGray' }) => background};
  color: ${({ color = 'black' }) => color};
  width: 8rem;
  height: 2rem;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  border: solid black;

  &:hover {
    transform: scale(1.01);
  }
`

export const SquareButtonCard = styled.button`
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

//  --- INPUTS ---
export const Input = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 40%;
  max-width: 300px;

  &:focus {
    border-color: #00bfa5;
    box-shadow: 0 0 8px rgba(0, 191, 165, 0.5);
  }
`
