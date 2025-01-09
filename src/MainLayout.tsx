import { AppBar, Box, Drawer, IconButton, Tab, Tabs, Toolbar } from '@mui/material'
import React, { useState } from 'react'

import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeHeaderButton, setActiveHeaderButton] = useState(null as string | null)
  const [activeSideItem, setActiveSideItem] = useState(null as string | null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveHeaderButton(newValue)
    setIsDrawerOpen(true)
  }

  const renderPanelContents = (panelName: string) => panelMappings[panelName] || null
  const panelMappings: Record<string, React.ReactNode> = {
    react: (
      <Tabs
        orientation='vertical'
        value={activeSideItem}
        onChange={(event, newValue) => {
          setActiveSideItem(newValue)
          setIsDrawerOpen(false)
        }}
      >
        <Tab value='gameTTT' label='Tic Tac Toe' component={Link} to='/gameTTT' />
        <Tab value='MemoryGame' label='Memory Game' component={Link} to='/MemoryGame' />
        <Tab value='HackerType' label='HackerType' component={Link} to='/HackerType' />
        <Tab
          value='MortgageCalculator'
          label='Mortgage Calculator'
          component={Link}
          to='/MortgageCalculator'
        />
        <Tab value='Regulators' label='PID regulator' component={Link} to='/Regulators' />
      </Tabs>
    ),
    embedded: (
      <Tabs
        orientation='vertical'
        value={activeSideItem}
        onChange={(event, newValue) => {
          setActiveSideItem(newValue)
          setIsDrawerOpen(false)
        }}
      >
        <Tab value='CureStation' label='Cure station' component={Link} to='/CureStation' />
      </Tabs>
    ),
    print: (
      <Tabs
        orientation='vertical'
        value={activeSideItem}
        onChange={(event, newValue) => {
          setActiveSideItem(newValue)
          setIsDrawerOpen(false)
        }}
      >
        <Tab value='Models3D' label='3D Models' component={Link} to='/Models3D' />
      </Tabs>
    ),
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      {/* AppBar */}
      <AppBar
        position='fixed'
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          width: '100%',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={p => setIsDrawerOpen(!p)}
            >
              <MenuIcon />
            </IconButton> */}

            <Link to='/'>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt='Navigate'
                width='50px'
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={activeHeaderButton}
              onChange={handleTabChange}
              // centered
            >
              <Tab value='react' label='React' />
              <Tab value='embedded' label='Embedded' />
              <Tab value='print' label='3D' />
            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='home'
              sx={{ mr: 2 }}
              onClick={p => setIsDrawerOpen(!p)}
            >
              <HomeIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side panel */}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
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
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          width: 'calc(100% - 20%)',
          marginLeft: '20%',
          padding: 3,
          marginTop: '64px',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
