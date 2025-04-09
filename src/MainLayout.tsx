import {
  AppBar,
  Box,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useMemo, useEffect, useState } from 'react'
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
  const [activeHeaderItem, setActiveHeaderItem] = useState('')
  const [activeSideItem, setActiveSideItem] = useState('')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveHeaderItem(newValue)
    isMobile && setIsDrawerOpen(true)
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  const renderPanelContents = (panelName: string) => {
    return panelMappings[panelName as keyof typeof panelMappings] || null
  }

  const panelMappings = useMemo(
    () => ({
      None: null,
      react: (
        <Tabs
          orientation='vertical'
          value={activeHeaderItem === 'react' ? activeSideItem : false}
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
          value={activeHeaderItem === 'embedded' ? activeSideItem : false}
          onChange={(event, newValue) => {
            setActiveSideItem(newValue)
            isMobile && setIsDrawerOpen(false)
          }}
        >
          <Typography variant='h2' sx={{ color: 'secondary.contrastText' }}>
            Projects:
          </Typography>
          <Tab value='CureStation' label='Cure station' component={Link} to='/CureStation' />
          <Typography variant='h2' sx={{ color: 'secondary.contrastText' }}>
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
          <Typography variant='h2' sx={{ color: 'secondary.contrastText' }}>
            Libraries:
          </Typography>
          <Tab value='PCF8591' label='PCF8591' component={Link} to='/PCF8591' />
        </Tabs>
      ),
      python: (
        <Tabs
          orientation='vertical'
          value={activeHeaderItem === 'python' ? activeSideItem : false}
          onChange={(event, newValue) => {
            setActiveSideItem(newValue)
            isMobile && setIsDrawerOpen(false)
          }}
        >
          <Typography variant='h2' sx={{ color: 'secondary.contrastText' }}>
            Computer vision:
          </Typography>
          <Tab value='shapeDetect' label='Shape detect - RT' component={Link} to='/ShapeDetect' />
          <Tab value='textDetect' label='Text detect - RT' component={Link} to='/TextDetect' />
          <Tab
            value='RectangleDimension'
            label='Rectangle dimension'
            component={Link}
            to='/RectangleDimension'
          />
          <Tab
            value='ComparePackageText'
            label='Compare text'
            component={Link}
            to='/ComparePackageText'
          />
          <Typography variant='h2' sx={{ color: 'secondary.contrastText' }}>
            Deep learning:
          </Typography>
          <Tab value='Mnist' label='MNIST' component={Link} to='/Mnist' />
          <Typography variant='h3' sx={{ color: 'secondary.contrastText' }}>
            - Kaggle
          </Typography>
          <Tab
            value='KaggleHousePrices'
            label='House Prices - Kaggle'
            component={Link}
            to='/KaggleHousePrices'
          />
        </Tabs>
      ),
      print: (
        <Tabs
          orientation='vertical'
          value={activeHeaderItem === 'print' ? activeSideItem : false}
          onChange={(event, newValue) => {
            setActiveSideItem(newValue)
            isMobile && setIsDrawerOpen(false)
          }}
        >
          <Tab value='Models3D' label='3D Models' component={Link} to='/Models3D' />
        </Tabs>
      ),
    }),
    [activeSideItem, isMobile]
  )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      {/* Header */}
      <AppBar
        position='fixed'
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          width: '96%',
          marginTop: '16px',
          marginLeft: '2%',
          backgroundColor: 'primary.main',
          height: '5.5rem',
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

            {!isMobile && (
              <Link to='/'>
                <img
                  src={`${process.env.PUBLIC_URL}/logo.png`}
                  alt='Navigate'
                  width='50px'
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            )}
          </Box>

          {isMobile ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl size='small' sx={{ minWidth: 140 }}>
                <Select
                  labelId='menu-label'
                  value={activeHeaderItem}
                  label='Sekce'
                  onChange={e => handleTabChange(e as any, e.target.value)}
                >
                  <MenuItem value='react'>React</MenuItem>
                  <MenuItem value='embedded'>Embedded</MenuItem>
                  <MenuItem value='python'>Python</MenuItem>
                  <MenuItem value='print'>3D</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Tabs
              value={activeHeaderItem === 'None' ? false : activeHeaderItem}
              onChange={handleTabChange}
            >
              <Tab value='react' label='React' />
              <Tab value='embedded' label='Embedded' />
              <Tab value='python' label='Python' />
              <Tab value='print' label='3D' />
            </Tabs>
          )}

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

      {/* Sidebar */}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: '20%',
            boxSizing: 'border-box',
            marginTop: '16px',
            marginLeft: '2%',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ paddingTop: 2, width: '100%' }}>
          {renderPanelContents(activeHeaderItem || 'react')}
        </Box>
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
            paddingTop: 2,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>{renderPanelContents(activeHeaderItem || 'react')}</Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          // backgroundColor: 'black',
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          padding: 3,
          overflowY: 'auto',
          width: !isMobile ? 'calc(100% - 20%)' : '100%',
          maxWidth: '1000px',
          margin: !isMobile ? '8rem 0% 0% 22%' : '7rem 0% 0% 0%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
