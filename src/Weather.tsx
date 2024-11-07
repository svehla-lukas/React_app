import { BoldText, Button, Container, Heading2, Icon, Text, Text20 } from './Styles'
import React, { useEffect, useRef, useState } from 'react'

const apiKeyOpenWeather = process.env.REACT_APP_OPENWEATHER_API_KEY

const useComponentDidMont = (fn: Parameters<typeof useEffect>[0]) => {
  useEffect(fn, [])
}

const Weather = () => {
  const timeToRender = 5 * 60 // seconds
  const [weatherData, setWeatherData] = useState(null)
  const intervalRef = useRef<number | null>(null)
  const [timeToUpdate, setTimeToUpdate] = useState(timeToRender)
  const [loadState, setLoadState] = useState('Loading...')

  useEffect(() => {
    fetchWeatherData('API')
    const timer = setInterval(() => {
      setTimeToUpdate(prev => (prev > 0 ? prev - 1 : timeToRender))
    }, 1_000)

    intervalRef.current = window.setInterval(() => {
      console.log('Fetch new weather data from server')
      fetchWeatherData('API')
    }, timeToRender * 1000)

    // CleanUp intervals on demount component
    return () => {
      console.log('component did unmount')
      clearInterval(timer)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timeToRender])

  const fetchWeatherData = async (source: string) => {
    setTimeToUpdate(timeToRender)
    console.log(process.env.REACT_APP_OPENWEATHER_API_KEY)
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 1_000)
    )

    try {
      const response = (await Promise.race([
        fetch(
          source === 'API'
            ? `https://api.openweathermap.org/data/2.5/weather?q=Brno,CZ&appid=${apiKeyOpenWeather}&units=metric`
            : 'http://localhost:1234/openWeatherMap'
        ),
        timeout,
      ])) as Response

      if (!response.ok) throw new Error('Network response was not ok')

      const data = await response.json()
      setWeatherData(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setLoadState('Error fetching weather data:')
      setWeatherData(null)
    }
  }

  const WeatherDisplay = ({ weatherData }: { weatherData: any }) => {
    if (!weatherData || !weatherData.main) {
      return <p>{loadState}</p>
    }

    const {
      name: cityName,
      main: { temp, feels_like, humidity },
      weather,
      wind: { speed },
    } = weatherData

    return (
      <Container>
        <Heading2>Weather in {cityName}</Heading2>
        <Container flexDirection='row'>
          <Icon
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt='Weather icon'
          />
          <Text20>{temp}°C</Text20>
        </Container>
        <BoldText>
          <p>{weather[0].description}</p>
          <p>Feels like: {Math.round(feels_like)}°C</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind Speed: {speed} m/s</p>
        </BoldText>
        <Text>
          Update in: {Math.floor(timeToUpdate / 60)} : {timeToUpdate % 60} s
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <Container flexDirection='column'>
        <Button background='lightGray' onClick={() => fetchWeatherData('API')}>
          Update from API
        </Button>
        <Button background='lightGray' onClick={() => fetchWeatherData('backend')}>
          Update from backend
        </Button>
      </Container>
      <WeatherDisplay weatherData={weatherData} />
    </Container>
  )
}

export default Weather
