import cors from 'cors'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 1234

const API_openWeatherMap = 'c79b236722edbac90d9b1871b720c9fc'

app.use(cors())

// on call:
// 1. read from file on local Storage
// 2. parse
// 3. sand back
app.get('/', (req, res) => {
  const { dataType } = req.query
  console.log('someone call server')

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
})

// Fetch data from an external website
app.get('/openWeatherMap', async (req, res) => {
  console.log('someone call weather')
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Brno,CZ&appid=${API_openWeatherMap}&units=metric`
    )
    const weather = await response.json()
    res.send(weather)

    // console.log(response)
  } catch (error) {
    console.error('Error fetching external data:', error)
    res.status(500).send({ error: 'Failed to fetch external data' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// server logic
const main = async () => {
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
}

main()

export {}
