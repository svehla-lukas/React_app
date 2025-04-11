import { Box, IconButton, Link as MuiLink, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import ReactMarkdown from 'react-markdown'
import { extractChapterFromMarkdown } from './helpers'
import rehypeRaw from 'rehype-raw'

export const Mnist = () => {
  const [articleMnist, setArticleMnist] = useState<string>('')

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/python/mnistArticle.md`)
      .then(response => response.text())
      .then(text => setArticleMnist(text))
      .catch(error => console.error('Failed to load Markdown:', error))
  }, [])

  const chapter1 = extractChapterFromMarkdown(articleMnist, '<!-- Ch1 -->', '<!-- Ch2 -->')
  const chapter2 = extractChapterFromMarkdown(articleMnist, '<!-- Ch2 -->', '<!-- Ch3 -->')
  const chapter3 = extractChapterFromMarkdown(articleMnist, '<!-- Ch3 -->')
  return (
    <Box>
      <Typography variant='h1'>MNIST Handwritten Digit Recognition: </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() =>
            window.open('https://github.com/svehla-lukas/Kaggle_workShop/tree/main/mnist', '_blank')
          }
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink
          variant='body1'
          href='https://github.com/svehla-lukas/Kaggle_workShop/tree/main/mnist'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>GitHub: MNIST Project</Typography>
        </MuiLink>
      </Box>

      <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chapter1}</ReactMarkdown>
      </Paper>
      <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chapter2}</ReactMarkdown>
      </Paper>
      <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chapter3}</ReactMarkdown>
      </Paper>
      <Typography variant='overline'>This content is exported from a .md file.</Typography>

      <Typography variant='overline'>Written on 8.4.2025.</Typography>
    </Box>
  )
}

export const KaggleHousePrices = () => {
  const [articleHousePrices, setArticleHousePrices] = useState('')

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/python/housePricesArticle.md`)
      .then(response => response.text())
      .then(text => setArticleHousePrices(text))
      .catch(error => console.error('Failed to load Markdown:', error))
  }, [])

  const chapter1 = extractChapterFromMarkdown(articleHousePrices, '<!-- Ch1 -->')
  // const chapter1 = extractChapterFromMarkdown(articleHousePrices, '<!-- Ch1 -->', '<!-- Ch2 -->')
  // const chapter2 = extractChapterFromMarkdown(articleHousePrices, '<!-- Ch2 -->', '<!-- Ch3 -->')
  // const chapter3 = extractChapterFromMarkdown(articleHousePrices, '<!-- Ch3 -->')

  return (
    <Box>
      <Typography variant='h1'>House Prices challenge</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() =>
            window.open(
              'https://github.com/svehla-lukas/Kaggle_workShop/tree/main/house-prices',
              '_blank'
            )
          }
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink
          variant='body1'
          href='https://github.com/svehla-lukas/Kaggle_workShop/tree/main/house-prices'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>GitHub: House Prices Project</Typography>
        </MuiLink>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() =>
            window.open('https://www.kaggle.com/code/lukassvehla/cheapestmodelhouseprice', '_blank')
          }
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <Box
            component='img'
            src='https://cdn.iconscout.com/icon/free/png-256/kaggle-3521526-2945029.png'
            sx={{
              width: 24,
              height: 24,
            }}
            alt='Kaggle'
          />
        </IconButton>
        <MuiLink
          variant='body1'
          href='https://www.kaggle.com/code/lukassvehla/chepestmodelhouseprice'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>Kaggle: Cheapest model</Typography>
        </MuiLink>
      </Box>

      <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chapter1}</ReactMarkdown>
      </Paper>
      {/* <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chapter2}</ReactMarkdown>
      </Paper>
      <Paper>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{chapter3}</ReactMarkdown>
      </Paper> */}
      <Typography variant='overline'>This content is exported from a .md file.</Typography>

      <Typography variant='overline'>Written on 8.4.2025.</Typography>
    </Box>
  )
}
