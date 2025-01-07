import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const apiKeyLinkPreview = process.env.REACT_APP_LINKPREVIEW_API_KEY

const Models3D = () => {
  const urls = [
    'https://www.printables.com/model/1131005-eta-cabero-blender',
    'https://www.printables.com/model/1135190-mixer-beater-holder',
  ]

  const [previews, setPreviews] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<string[]>([])

  const fetchPreview = async (url: string) => {
    try {
      const response = await fetch(
        `https://api.linkpreview.net/?key=${apiKeyLinkPreview}&q=${encodeURIComponent(url)}`
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch preview: ${response.statusText}`)
      }
      return await response.json()
    } catch (err: any) {
      console.error(`Error fetching link preview for URL ${url}:`, err)
      throw err
    }
  }

  useEffect(() => {
    const loadPreviews = async () => {
      setLoading(true)
      setErrors([])
      const results: any[] = []
      const errorsList: string[] = []

      for (const url of urls) {
        try {
          const preview = await fetchPreview(url)
          results.push(preview)
        } catch (err: any) {
          errorsList.push(`Error fetching ${url}: ${err.message || 'Unknown error'}`)
        }
      }

      setPreviews(results)
      setErrors(errorsList)
      setLoading(false)
    }

    loadPreviews()
  }, []) // No dependencies to prevent re-fetching on every render

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Box sx={{ padding: 2 }}>
      {errors.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          {errors.map((error, index) => (
            <Typography key={index} color='error' variant='body2'>
              {error}
            </Typography>
          ))}
        </Box>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {previews.map((previewData, index) => (
          <Card key={index} sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3 }}>
            {/* Image */}
            <CardMedia
              component='img'
              image={previewData.image}
              alt={previewData.title}
              sx={{ borderRadius: '8px 8px 0 0' }}
            />

            {/* Content */}
            <CardContent>
              <Typography variant='h4' component='h3' gutterBottom>
                {previewData.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {previewData.description}
              </Typography>

              {/* Button */}
              <Button
                variant='contained'
                color='primary'
                href={previewData.url}
                target='_blank'
                rel='noopener noreferrer'
                sx={{ marginTop: 2 }}
              >
                Visit Page
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Models3D
