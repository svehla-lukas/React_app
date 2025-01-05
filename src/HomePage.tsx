import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

import Clock from './clock'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'

const panelContents = {
  react: (
    <Box>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        React Content
      </Typography>
      <List>
        <ListItem>
          <MuiLink component={Link} to='/gameTTT' underline='hover' color='secondary'>
            Tic Tac Toe
          </MuiLink>
        </ListItem>
        <ListItem>
          <MuiLink component={Link} to='/MemoryGame' underline='hover' color='secondary'>
            Memory Game
          </MuiLink>
        </ListItem>
        <ListItem>
          <MuiLink component={Link} to='/HackerType' underline='hover' color='secondary'>
            HackerType
          </MuiLink>
        </ListItem>
        <ListItem>
          <MuiLink component={Link} to='/MortgageCalculator' underline='hover' color='secondary'>
            Mortgage Calculator
          </MuiLink>
        </ListItem>
      </List>

      <Typography variant='h6' sx={{ marginTop: 2, marginBottom: 2 }}>
        React API
      </Typography>
      <List>
        <ListItem>
          <MuiLink component={Link} to='/MapsCZ' underline='hover' color='secondary'>
            Maps CZ - API
          </MuiLink>
        </ListItem>
        <ListItem>
          <MuiLink component={Link} to='/Weather' underline='hover' color='secondary'>
            Weather - API
          </MuiLink>
        </ListItem>
      </List>
    </Box>
  ),
  stm32: (
    <Box>
      <Typography variant='h6'>STM micro controler</Typography>
      <MuiLink component={Link} to='/' underline='hover' color='secondary'>
        STM - no index
      </MuiLink>
    </Box>
  ),
  print: (
    <Box>
      <Typography variant='h6'>3D Printing Resources</Typography>
      <MuiLink component={Link} to='/Models3D' underline='hover' color='secondary'>
        3D Models
      </MuiLink>
      <MuiLink component={Link} to='/PrintTutorials' underline='hover' color='secondary'>
        Printing Tutorials
      </MuiLink>
    </Box>
  ),
}

const HomePage = () => {
  const [sidePanelContent, setSidePanelContent] = useState<React.ReactNode>(panelContents.react)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Container sx={{ bgcolor: 'tomato', minHeight: '100vh' }}>
      <Box>
        {/* Header */}
        <AppBar position='static' sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to='/'>
                <img
                  src={`${process.env.PUBLIC_URL}/logo.png`}
                  alt='Navigate'
                  width='50px'
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setSidePanelContent(panelContents.react)}
              >
                <Typography variant='h6'>React</Typography>
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setSidePanelContent(panelContents.stm32)}
              >
                <Typography variant='h6'>STM32</Typography>
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setSidePanelContent(panelContents.print)}
              >
                <Typography variant='h6'>3D print</Typography>
              </Button>
            </Box>

            {/* Tlačítko pro otevření panelu */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: 'flex', sm: 'none' }, // Zobrazuje se jen na menších obrazovkách
                color: 'white',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* Side panel */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' }, // hide panel on small screen
              flexDirection: 'column',
              height: '100vh',
              width: '20%',
              backgroundColor: 'primary.main',
            }}
          >
            {/* <Typography variant='h6' sx={{ color: 'white', padding: 2 }}>
              Side Panel
            </Typography> */}
            <Typography sx={{ color: 'white', padding: 2 }}>{sidePanelContent}</Typography>
          </Box>

          {/* Drawer for phones view */}
          <Drawer
            anchor='left'
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{
              display: { xs: 'block', sm: 'none' }, // visible only on small screen
              '& .MuiDrawer-paper': {
                width: '60%', // panel width on phones
                padding: 2,
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Typography variant='h6' sx={{ color: 'white', marginBottom: 2 }}>
              Side Panel
            </Typography>
            <Typography sx={{ color: 'white' }}>{sidePanelContent}</Typography>
          </Drawer>

          {/* Main content */}
          <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: 'background.default' }}>
            <Box
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3, // MUI box shadow
                backgroundColor: 'background.paper', // MUI barevný režim
              }}
            >
              <Outlet /> {/* Tady se vykreslí komponenta odpovídající aktuální cestě */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage
