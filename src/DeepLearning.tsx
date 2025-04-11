import { Box, IconButton, Link as MuiLink, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import ReactMarkdown from 'react-markdown'
import { extractChapterFromMarkdown } from './helpers'
import rehypeRaw from 'rehype-raw'

const iconKaggle = 'https://cdn.iconscout.com/icon/free/png-256/kaggle-3521526-2945029.png'

export const Mnist = () => {
  const linkKaggle = 'https://www.kaggle.com/competitions/mnist'
  const linkGitHub = 'https://github.com/svehla-lukas/Kaggle_workShop/tree/main/mnist'
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
          onClick={() => window.open(linkGitHub, '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink variant='body1' href={linkGitHub} target='_blank' rel='noopener noreferrer'>
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
  const linkKaggle =
    'https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques'
  const linkGitHub = 'https://github.com/svehla-lukas/Kaggle_workShop/tree/main/house-prices'
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
          onClick={() => window.open(linkGitHub, '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink variant='body1' href={linkGitHub} target='_blank' rel='noopener noreferrer'>
          <Typography variant='body1'>GitHub: House Prices Project</Typography>
        </MuiLink>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() => window.open(linkKaggle, '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <Box
            component='img'
            src={iconKaggle}
            sx={{
              width: 24,
              height: 24,
            }}
            alt='Kaggle'
          />
        </IconButton>
        <MuiLink variant='body1' href={linkKaggle} target='_blank' rel='noopener noreferrer'>
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
export const IndustrialCostingDefects = () => {
  const linkGitHub =
    'https://github.com/svehla-lukas/Kaggle_workShop/tree/main/casting_product_quality_inspection'
  const linkKaggle =
    'https://www.kaggle.com/datasets/ravirajsinh45/real-life-industrial-dataset-of-casting-product'
  const [article, setArticle] = useState('')

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/python/articleCostingDefects.md`)
      .then(response => response.text())
      .then(text => setArticle(text))
      .catch(error => console.error('Failed to load Markdown:', error))
  }, [])

  const chapter1 = extractChapterFromMarkdown(article, '<!-- Ch1 -->')
  // const chapter1 = extractChapterFromMarkdown(article, '<!-- Ch1 -->', '<!-- Ch2 -->')
  // const chapter2 = extractChapterFromMarkdown(article, '<!-- Ch2 -->', '<!-- Ch3 -->')
  // const chapter3 = extractChapterFromMarkdown(article, '<!-- Ch3 -->')

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() => window.open(linkGitHub, '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink variant='body1' href={linkGitHub} target='_blank' rel='noopener noreferrer'>
          <Typography variant='body1'>GitHub: </Typography>
        </MuiLink>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() => window.open(linkKaggle, '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <Box
            component='img'
            src={iconKaggle}
            sx={{
              width: 24,
              height: 24,
            }}
            alt='Kaggle'
          />
        </IconButton>
        <MuiLink variant='body1' href={linkKaggle} target='_blank' rel='noopener noreferrer'>
          <Typography variant='body1'>Kaggle: Data model</Typography>
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
