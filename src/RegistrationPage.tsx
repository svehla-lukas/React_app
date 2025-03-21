import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'

import { EmojiPeopleOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RegistrationPage = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const navigate = useNavigate()

  const handleLogin = async () => {
    console.log('UserName:', userName)
    console.log('Password:', password)

    const response = await fetch('http://localhost:1234/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password }),
    })

    const data = await response.json()

    if (response.ok) {
      // ✅ Uložení uživatele do localStorage
      localStorage.setItem('user', JSON.stringify(data.user))

      setSnackbarMessage('Login successful!')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      // ✅ Přesměrování na hlavní stránku po loginu
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } else {
      setSnackbarMessage(data.error || 'Invalid credentials or server error.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
      <Card sx={{ width: 320, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom textAlign='center'>
            Log in
          </Typography>

          <TextField
            label='User name'
            variant='outlined'
            fullWidth
            margin='normal'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />

          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />

          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Log in
          </Button>
        </CardContent>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:1234/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      setSnackbarMessage('User registered successfully!')
      setSnackbarSeverity('success')
      setUsername('') // Vyčištění formuláře
      setPassword('')
    } catch (error) {
      console.error('Registration error:', error)
      setSnackbarMessage('Registration failed: ' + error)
      setSnackbarSeverity('error')
    }
    setOpenSnackbar(true)
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
      <Card sx={{ width: 320, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom textAlign='center'>
            Register
          </Typography>

          <TextField
            label='Username'
            variant='outlined'
            fullWidth
            margin='normal'
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRegister()}
          />

          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRegister()}
          />

          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleRegister}
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </CardContent>
      </Card>

      {/* Snackbar - Notifikace o úspěchu / neúspěchu */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default RegistrationPage
