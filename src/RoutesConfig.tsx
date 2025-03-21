import { CodeSnippetCubeIdeCheatSheet, CodeSnippetMemoryAllocate } from './CodeSnippet'
import { ShapeDetect, TextDetect } from './ComputerVision'

import Clock from './clock'
import CureStation from './CureStation'
import Encoder from './Encoder'
import HackerType from './HackerType'
import HomePage from './HomePage'
import LunchOrder from './LunchOrder'
import MainLayout from './MainLayout'
import MapsCZ from './MapsCZ'
import MemoryGame from './MemoryGame'
import Models3D from './Models3D'
import MortgageCalculator from './MortgageCalculator'
import PCF8591 from './LibrariesArticles'
import React from 'react'
import RegistrationPage from './RegistrationPage'
import Regulators from './Regulators'
import { RouteObject } from 'react-router-dom'
import TicTacToe from './gameTTT'
import Weather from './Weather'

const main = [
  { index: true, element: <HomePage /> },
  { path: 'clock', element: <Clock /> },
]
const react = [
  { path: 'gameTTT', element: <TicTacToe /> },
  { path: 'MemoryGame', element: <MemoryGame /> },
  { path: 'HackerType', element: <HackerType /> },
  { path: 'Weather', element: <Weather /> },
  { path: 'MapsCZ', element: <MapsCZ /> },
  { path: 'MortgageCalculator', element: <MortgageCalculator /> },
  { path: 'Regulators', element: <Regulators /> },
  { path: 'RegistrationPage', element: <RegistrationPage /> },
  { path: 'LunchOrder', element: <LunchOrder /> },
]

const python = [
  { path: 'ShapeDetect', element: <ShapeDetect /> },
  { path: 'TextDetect', element: <TextDetect /> },
]

const embedded = [
  { path: 'CureStation', element: <CureStation /> },
  { path: 'Encoder', element: <Encoder /> },
  { path: 'CodeSnippetMemoryAllocate', element: <CodeSnippetMemoryAllocate /> },
  { path: 'CodeSnippetCubeIdeCheatSheet', element: <CodeSnippetCubeIdeCheatSheet /> },
  { path: 'PCF8591', element: <PCF8591 /> },
]
const print3d = [{ path: 'Models3D', element: <Models3D /> }]

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      ...main,
      ...react,
      ...embedded,
      ...python,
      ...print3d,
    ],
  },
]
