import axios, { AxiosError } from 'axios'

import cors from 'cors'
import { dirname } from 'path'
import dotenv from 'dotenv'
import express from 'express'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()
const port = 1234

app.use(cors())

const apiKeyOpenWeather = process.env.OPENWEATHER_API_KEY
const apiKeyConfluence = process.env.CONFLUENCE_API_KEY

// Root endpoint
app.get('/', (req, res) => {
  const { dataType } = req.query
  console.log('someone call server')

  try {
    if (dataType === 'typeA') {
      const dataString = fs.readFileSync(`${__dirname}/../hackerTypeData.json`, 'utf-8')
      const data = JSON.parse(dataString)
      res.send(data)
    } else if (dataType === 'typeB') {
      const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
      const data = JSON.parse(dataString)
      res.send(data)
    } else {
      res.status(400).send({ error: 'Invalid data type requested' })
    }
  } catch (error) {
    console.error('Error reading file:', error)
    res.status(500).send({ error: 'Failed to read the requested data' })
  }
})

// Fetch data from an external website - OpenWeatherMap
app.get('/openWeatherMap', async (req, res) => {
  console.log('someone call weather')

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Brno,CZ&appid=${apiKeyOpenWeather}&units=metric`
    )

    const weather = await response.json()
    res.send(weather)
  } catch (error) {
    console.error('Error fetching external data:', error)
    console.log('Error fetching external data:', error)
    res.status(500).send({ error: 'Failed to fetch external data' })
  }
})

// Fetch data from an external website - Atlassian Confluence
const email = process.env.CONFLUENCE_EMAIL
const apiToken = process.env.CONFLUENCE_API_TOKEN
// Zakódování do Base64
const basicAuthToken = Buffer.from(`${email}:${apiToken}`).toString('base64')

app.get('/BONDSTER', async (req, res) => {
  const confluenceUrl = 'https://pravoai.atlassian.net/wiki/rest/api/content?spaceKey=BONDSTER'

  console.log('someone called BONDSTER')
  try {
    const response = await axios.get(confluenceUrl, {
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        'Content-Type': 'application/json',
      },
    })
    // full data
    // res.json(response.data)
    // formated data
    const formattedData = response.data.results.map((page: any) => ({
      id: page.id,
      title: page.title,
      link: response.data._links.base + page._links.webui,
    }))
    res.json(formattedData)
  } catch (error) {
    console.error('Error fetching external data:', error)
    res.status(500).send({ error: 'Failed to fetch external data' })
  }
})

app.get('/BONDSTER/:id', async (req, res) => {
  const pageId = req.params.id // Načtení ID stránky z parametru URL
  console.log(pageId)
  console.log(`Fetching page details for ID: ${pageId}`)

  try {
    // URL pro získání podrobností o stránce
    const pageDetailsUrl = `https://pravoai.atlassian.net/wiki/rest/api/content/${pageId}?expand=body.storage`

    // Fetcování stránky
    const response = await axios.get(pageDetailsUrl, {
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        'Content-Type': 'application/json',
      },
    })
    // Odeslání zpět klientovi
    res.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError // Explicitní přetypování

    if (axiosError.response) {
      console.error('Error fetching page details:', axiosError.message)
      res.status(axiosError.response.status).json({ error: axiosError.message })
    } else {
      console.error('Unexpected error:', axiosError.message)
      res.status(500).json({ error: 'Failed to fetch page details', details: axiosError.message })
    }
  }
})

app.get('/personalSpace', async (req, res) => {
  const personalSpaceUrl =
    'https://pravoai.atlassian.net/wiki/rest/api/content?spaceKey=~712020c73433772ef94ca4b1ec4272c9bf954f'
  console.log('someone called personalSpace')
  try {
    const response = await axios.get(personalSpaceUrl, {
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        'Content-Type': 'application/json',
      },
    })

    res.json(response.data)
  } catch (error) {
    console.error('Error fetching external data:', error)
    res.status(500).send({ error: 'Failed to fetch external data' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Server logic - Run some operation
const main = async () => {
  try {
    const dataString = fs.readFileSync(`${__dirname}/../hackerTypeData.json`, 'utf-8')
    const data = JSON.parse(dataString)

    const newData = {
      ...data,
      users: [
        {
          id: '1',
          name: 'kuba',
        },
      ],
    }

    fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(newData, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error in main function:', error)
  }
}

main()
