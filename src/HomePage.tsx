import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material'

import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import HomeIcon from '@mui/icons-material/Home'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const HomePage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        <Box></Box>
        <Avatar
          src={`${process.env.PUBLIC_URL}/profile.jpg`} // Replace with your image path
          alt='avatar Lukas Svehla'
          sx={{
            width: 300,
            height: 300,
            margin: '0 auto',
          }}
        />
        <Typography variant='h1' sx={{ marginTop: 2 }}>
          Lukas Svehla
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Mechatronic | Maker
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 6, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h4' gutterBottom>
          Contact:
        </Typography>

        {/* Home */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <IconButton
            // onClick={() => window.open('https://maps.google.com/?q=Brno', '_blank')}
            sx={{
              display: 'flex',
              color: 'primary.main',
            }}
          >
            <HomeIcon />
          </IconButton>
          <MuiLink
            href='https:// noremaps.google.com/?q=Brno'
            target='_blank'
            rel='noopenerferrer'
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography>Brno - Czech Republic</Typography>
          </MuiLink>
        </Box>

        {/* Gmail */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <IconButton
            onClick={() => window.open('mailto:svehl.lukas@gmail.com', '_blank')}
            sx={{
              display: 'flex',
              color: 'red',
            }}
          >
            <EmailIcon />
          </IconButton>
          <MuiLink href='mailto:svehl.lukas@gmail.com' rel='noopener noreferrer'>
            <Typography>svehl.lukas@gmail.com</Typography>
          </MuiLink>
        </Box>

        {/* GitHub */}
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
          <MuiLink href='https://github.com/svehla-lukas' target='_blank' rel='noopener noreferrer'>
            <Typography>GitHub: github.com/svehla-lukas</Typography>
          </MuiLink>
        </Box>

        {/* LinkedIn */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <IconButton
            onClick={() => window.open('https://www.linkedin.com/in/svehla-lukas/', '_blank')}
            sx={{
              display: 'flex',
              color: 'blue',
            }}
          >
            <LinkedInIcon />
          </IconButton>
          <MuiLink
            href='https://www.linkedin.com/in/svehla-lukas/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Typography>LinkedIn: linkedin.com/in/svehla-lukas</Typography>
          </MuiLink>
        </Box>
      </Box>

      {/* TLDR Section */}
      <Box
        sx={{
          marginBottom: 6,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        {/* <Typography variant='h4' gutterBottom>
          About me
        </Typography> */}
        <Typography variant='h3' gutterBottom>
          Hallo, my name is Lukas, and I enjoy programming and working with electronic and
          mechanical devices. I love fixing things to learn how they work and using that knowledge
          to create something new.
        </Typography>
        <Typography variant='h3' gutterBottom>
          This page was created in 2023 when I began learning JavaScript and React. Initially, it
          was just a learning project, but over time, it evolved into a personal blog where I
          showcase my projects, keep a backup of my work, and organize my notes.
        </Typography>
        <Typography variant='body1' sx={{ marginBottom: 2 }}></Typography>

        <Button
          variant='outlined'
          href='https://drive.google.com/file/d/17HRc2waXQytg8zd7V1tckjfO8e6yBTzG/view?usp=sharing'
          target='_blank'
          rel='noopener noreferrer'
          sx={{
            marginBottom: 2,
          }}
        >
          <Typography variant='button'>Get PDF CV</Typography>
        </Button>
      </Box>
      <Box textAlign='center'>
        <Paper>
          <Typography variant='h1'>The best way to predict the future is to create it</Typography>
          <Typography textAlign={'right'} variant='subtitle1' color='text.secondary'>
            — Peter Drucker
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default HomePage
