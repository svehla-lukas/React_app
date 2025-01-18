import { AppBar, Box, Drawer, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeHeaderButton, setActiveHeaderButton] = useState(null as string | null)
  const [activeSideItem, setActiveSideItem] = useState(null as string | null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveHeaderButton(newValue)
    isMobile && setIsDrawerOpen(true)
  }

  const renderPanelContents = (panelName: string) => panelMappings[panelName] || null
  const panelMappings: Record<string, React.ReactNode> = {
    react: (
      <Tabs
        orientation='vertical'
        value={activeSideItem}
        onChange={(event, newValue) => {
          setActiveSideItem(newValue)
          isMobile && setIsDrawerOpen(false)
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
          isMobile && setIsDrawerOpen(false)
        }}
      >
        <Typography variant='h2' sx={{ color: 'primary.primary' }}>
          Projects:
        </Typography>
        <Tab value='CureStation' label='Cure station' component={Link} to='/CureStation' />
        <Typography variant='h2' sx={{ color: 'primary.primary' }}>
          Code snippet:
        </Typography>
        <Tab value='Encoder' label='Encoder' component={Link} to='/Encoder' />
        <Tab
          value='CubeIde-CheatSheet'
          label='CubeIde-CheatSheet'
          component={Link}
          to='/CodeSnippetCubeIdeCheatSheet'
        />
        <Tab
          value='malloc - calloc'
          label='malloc - calloc'
          component={Link}
          to='/CodeSnippetMemoryAllocate'
        />
        <Typography variant='h2' sx={{ color: 'primary.primary' }}>
          Libraries:
        </Typography>
        <Tab value='PCF8591' label='PCF8591' component={Link} to='/PCF8591' />
      </Tabs>
    ),
    print: (
      <Tabs
        orientation='vertical'
        value={activeSideItem}
        onChange={(event, newValue) => {
          setActiveSideItem(newValue)
          isMobile && setIsDrawerOpen(false)
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
      <AppBar
        position='fixed'
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          width: '96%',
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
            {isMobile && (
              <IconButton
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
                onClick={p => setIsDrawerOpen(p => !p)}
              >
                <MenuIcon />
              </IconButton>
            )}

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
              aria-label='scroll-to-top'
              sx={{ mr: 2 }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }}
            >
              <KeyboardDoubleArrowUpIcon />
            </IconButton>

            <IconButton
              component={Link}
              to='/'
              edge='start'
              color='inherit'
              aria-label='home'
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* desktop panel */}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: '20%',
            boxSizing: 'border-box',
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
        ModalProps={{
          keepMounted: true, // Better power on mobil phones
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: '60%',
            padding: 2,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>{renderPanelContents(activeHeaderButton || 'react')}</Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          padding: 3,
          marginTop: '100px',
          overflowY: 'auto',
          width: !isMobile ? 'calc(100% - 20%)' : '100%',
          marginLeft: !isMobile ? '20%' : '0%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
