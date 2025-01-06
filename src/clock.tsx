import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Clock = () => {
  const [actualTime, setActualTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActualTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        padding: 1,
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant='h6' sx={{ color: 'text.primary' }}>
        {actualTime.toLocaleTimeString()}
      </Typography>
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {actualTime.toLocaleDateString()}
      </Typography>
    </Box>
  )
}

export default Clock
