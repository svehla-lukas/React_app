import React, { useEffect, useState } from 'react'

type Props = {} // Props are READ-ONLY
type State = {
  date: Date
  clock: number
}

const Clock = () => {
  // Initialize state using useState hook
  const [actualTime, setActualTime] = useState(new Date())

  // This effect replaces componentDidMount and componentWillUnmount lifecycle methods
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActualTime(new Date())
    }, 1000)

    // Cleanup function that acts like componentWillUnmount
    return () => {
      clearInterval(intervalId)
    }
  }, []) // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
      }}
    >
      <div>Time: {actualTime.toLocaleString()}</div>
      <div>Date: {actualTime.toDateString()}</div>
    </div>
  )
}

export default Clock
