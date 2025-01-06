import { Box, IconButton, Link as MuiLink, Paper, Typography } from '@mui/material'

import GitHubIcon from '@mui/icons-material/GitHub'
import React from 'react'

const CureStation = () => {
  return (
    <Box>
      <Typography variant='h1'>Cure station Git repository: </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() => window.open('https://github.com/svehla-lukas', '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink
          href='https://github.com/svehla-lukas/Cure_Station'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography>GitHub: github.com/svehla-lukas/Cure_Station</Typography>
        </MuiLink>
      </Box>
      <Box>
        <Paper>
          <Typography variant='body1'>
            This pages will be snap the process of develop Wash and Cure station for resin printer.
            <p>I have AnyCubic photon mono 2.</p>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
export default CureStation
