import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
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
        marginTop: 4,
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
        <Avatar
          src={`${process.env.PUBLIC_URL}/profile.jpg`} // Replace with your image path
          alt='Your Name'
          sx={{
            width: 300,
            height: 300,
            margin: '0 auto',
          }}
        />
        <Typography variant='h3' sx={{ marginTop: 2 }}>
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
            // href='https:// noremaps.google.com/?q=Brno'
            // target='_blank'
            // rel='noopenerferrer'
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
            <Typography>linkedin.com/in/svehla-lukas</Typography>
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
        <Typography variant='body1' gutterBottom>
          My name is Lukas Svehla, and I enjoy programming and working with electronic and
          mechanical devices. I love fixing things to learn how they work and using that knowledge
          to create something new.
        </Typography>
        <Typography>
          This website showcases some of the skills I have developed over time, offering a glimpse
          into my projects and ideas that I am excited to share with others.
        </Typography>
        <Typography variant='body1' sx={{ marginBottom: 2 }}></Typography>

        <Button
          variant='contained'
          color='secondary'
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
    </Container>
  )
}

export default HomePage
