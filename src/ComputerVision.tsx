import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'

const useComponentDidMount = (fn: () => void): void => {
  useEffect(fn, [])
}

const ShapeDetect = () => {
  const [markdown, setMarkdown] = useState<string>('')

  useComponentDidMount(() => {
    fetch(`${process.env.PUBLIC_URL}/python/shapeDetectArticle.md`)
      .then(response => response.text())
      .then(text => setMarkdown(text))
      .catch(error => console.error('Failed to load Markdown:', error))
  })

  const YouTubePreview = () => {
    const embedUrl = `https://www.youtube.com/embed/4aLXgbuI5o4`

    return (
      <Card sx={{ maxWidth: 560, margin: 'auto', boxShadow: 3 }}>
        <Typography variant='body1' gutterBottom>
          Shape detect test
        </Typography>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          {' '}
          <iframe
            src={embedUrl}
            title='YouTube Video Player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </Box>
        <CardContent></CardContent>
      </Card>
    )
  }

  const ShapeDetectGif = () => {
    return (
      <Box
        component='img'
        src={`${process.env.PUBLIC_URL}/python/shapeDetect.gif`}
        alt='My Animation'
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 2,
          boxShadow: 3,
        }}
      />
    )
  }

  return (
    <Box>
      <Typography variant='h1'>Detekce tvaru v reálném čase: </Typography>
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
          variant='body1'
          href='https://github.com/svehla-lukas/SmartCam_OpenCVcamera'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>
            GitHub: github.com/svehla-lukas/SmartCam_OpenCVcamera
          </Typography>
        </MuiLink>
      </Box>
      <ShapeDetectGif />
      <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
        <Typography variant='overline'>This content is exported from a .md file.</Typography>
      </Paper>

      <YouTubePreview />
      <Typography variant='overline'>Written on 22.1.2025.</Typography>
    </Box>
  )
}

const TextDetect = () => {
  const [markdown, setMarkdown] = useState<string>('')

  useComponentDidMount(() => {
    fetch(`${process.env.PUBLIC_URL}/python/textDetectArticle.md`)
      .then(response => response.text())
      .then(text => setMarkdown(text))
      .catch(error => console.error('Failed to load Markdown:', error))
  })

  const YouTubePreview = () => {
    const embedUrl = `https://www.youtube.com/embed/RGLOL4ZW7x4`

    return (
      <Card sx={{ maxWidth: 560, margin: 'auto', boxShadow: 3 }}>
        <Typography variant='body1' gutterBottom>
          Shape detect test
        </Typography>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          {' '}
          <iframe
            src={embedUrl}
            title='YouTube Video Player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </Box>
        <CardContent></CardContent>
      </Card>
    )
  }

  const ShapeDetectGif = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Box
          component='img'
          src={`${process.env.PUBLIC_URL}/python/textDetectGif.gif`}
          alt='My Animation'
          sx={{
            width: '100%',
            maxWidth: 700,
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h1'>Detekce textu na objektu v reálném čase: </Typography>
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
          variant='body1'
          href='https://github.com/svehla-lukas/SmartCam_OpenCVcamera/tree/textDetection'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>
            GitHub: github.com/svehla-lukas/SmartCam_OpenCVcamera/tree/textDetection
          </Typography>
        </MuiLink>
      </Box>
      <ShapeDetectGif />
      <Paper>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter style={darcula} language={match[1]} PreTag='div' {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
        <Typography variant='overline'>This content is exported from a .md file.</Typography>
      </Paper>
      <YouTubePreview />
      <Typography variant='overline'>Written on 23.1.2025.</Typography>
    </Box>
  )
}

export { ShapeDetect, TextDetect }
