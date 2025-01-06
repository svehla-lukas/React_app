import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeHeaderButton, setActiveHeaderButton] = useState<string | null>(null)
  const [activeSideItem, setActiveSideItem] = useState<string | null>(null)

  const renderPanelContents = (panelName: string) => panelMappings[panelName] || null
  const panelMappings: Record<string, React.ReactNode> = {
    react: (
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/gameTTT'
            sx={{
              backgroundColor: activeSideItem === 'gameTTT' ? 'secondary.main' : 'primary.main',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('gameTTT')}
          >
            <ListItemText primary='Tic Tac Toe' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/MemoryGame'
            sx={{
              backgroundColor: activeSideItem === 'MemoryGame' ? 'secondary.main' : 'primary.main',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('MemoryGame')}
          >
            <ListItemText primary='Memory Game' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/HackerType'
            sx={{
              backgroundColor: activeSideItem === 'HackerType' ? 'secondary.main' : 'primary.main',
              color: activeSideItem === 'HackerType' ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('HackerType')}
          >
            <ListItemText primary='HackerType' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/MortgageCalculator'
            sx={{
              backgroundColor:
                activeSideItem === 'MortgageCalculator' ? 'secondary.main' : 'primary.main',
              color: activeSideItem === 'MortgageCalculator' ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('MortgageCalculator')}
          >
            <ListItemText primary='Mortgage Calculator' />
          </ListItemButton>
        </ListItem>
      </List>
    ),
    embedded: (
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/CureStation'
            sx={{
              backgroundColor: activeSideItem === 'embedded' ? 'secondary.main' : 'primary.main',
              color: activeSideItem === 'embedded' ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('embedded')}
          >
            <ListItemText primary='Cure station' />
          </ListItemButton>
        </ListItem>
      </List>
    ),
    print: (
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/Models3D'
            sx={{
              backgroundColor: activeSideItem === 'Models3D' ? 'secondary.main' : 'primary.main',
              color: activeSideItem === 'Models3D' ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('Models3D')}
          >
            <ListItemText primary='3D Models' />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/PrintTutorials'
            sx={{
              backgroundColor:
                activeSideItem === 'PrintTutorials' ? 'secondary.main' : 'primary.main',
              color: activeSideItem === 'PrintTutorials' ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            onClick={() => setActiveSideItem('PrintTutorials')}
          >
            <ListItemText primary='Printing Tutorials' />
          </ListItemButton>
        </ListItem> */}
      </List>
    ),
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position='fixed'
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          display: 'flex',
          alignItems: 'center',
          paddingX: 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', width: '100%' }}>
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
              display: 'flex',
              gap: 2,
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              color={activeHeaderButton === 'react' ? 'secondary' : 'primary'}
              onClick={() => {
                setActiveHeaderButton('react')
                setIsDrawerOpen(true)
              }}
            >
              <Typography variant='h3'>React</Typography>
            </Button>
            <Button
              variant='contained'
              color={activeHeaderButton === 'embedded' ? 'secondary' : 'primary'}
              onClick={() => {
                setActiveHeaderButton('embedded')
                setIsDrawerOpen(true)
              }}
            >
              <Typography variant='h3'>Embedded</Typography>
            </Button>
            <Button
              variant='contained'
              color={activeHeaderButton === 'print' ? 'secondary' : 'primary'}
              onClick={() => {
                setActiveHeaderButton('print')
                setIsDrawerOpen(true)
              }}
            >
              <Typography variant='h3'>3D Print</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              gap: 2,
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                color: 'white',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side panel */}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: '20%',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: '20%',
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>{renderPanelContents(activeHeaderButton || 'react')}</Box>
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '60%',
            padding: 2,
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>{renderPanelContents(activeHeaderButton || 'react')}</Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3, marginTop: '64px' }}>
        <Outlet />
      </Box>
      <Box>activeHeaderButton: {activeHeaderButton}</Box>
    </Box>
  )
}

export default MainLayout
