// weatherStyles.ts
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

export const Container = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`

export const WeatherContainer = styled.div`
  display: flex;
  align-items: center; /* Center items vertically within the row */
  justify-content: center;
  flex-direction: row; /* Align items horizontally */
  gap: 10px; /* Adjust spacing between elements */
  margin-top: 10px;
`

export const Icon = styled.img`
  width: 80px;
  height: 80px;
`

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

export const BoldText = styled.p`
  font-size: 1rem;
  color: #555;
  font-weight: bold;
  p {
    margin: 0.5rem 0; /* Adds spacing between each line */
  }
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const Button = styled.button<{ background?: string; color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 5px;
  background: ${({ background = 'yellow' }) => background};
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

export const SquareButton = styled.button`
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
