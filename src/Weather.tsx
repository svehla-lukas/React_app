import {
  BoldText,
  Button,
  Container,
  Description,
  ExtraInfo,
  Heading,
  Icon,
  OrangeText,
  SquareButton,
  Text,
  WeatherContainer,
} from './Styles'
import React, { useEffect, useRef, useState } from 'react'

const useComponentDidMont = (fn: Parameters<typeof useEffect>[0]) => {
  useEffect(fn, [])
}

const Weather = () => {
  const timeToRender = 5 * 60 // seconds
  const [weatherData, setWeatherData] = useState(null)
  const intervalRef = useRef<number | null>(null)
  const [timeToUpdate, setTimeToUpdate] = useState(timeToRender)

  useComponentDidMont(() => {
    fetchWeatherData()
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeToUpdate(prev => (prev > 0 ? prev - 1 : timeToRender))
    }, 1_000)

    intervalRef.current = window.setInterval(() => {
      console.log('Fetch new weather data from server')
      fetchWeatherData()
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

  const fetchWeatherData = async () => {
    setTimeToUpdate(timeToRender)
    try {
      const response = await fetch('http://localhost:1234/openWeatherMap')
      const data = await response.json()
      setWeatherData(data)
      console.log(weatherData)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const WeatherDisplay = ({ weatherData }: { weatherData: any }) => {
    if (!weatherData || !weatherData.main) {
      return <p>Loading...</p>
    }

    const {
      name: cityName,
      main: { temp, feels_like, humidity },
      weather,
      wind: { speed },
    } = weatherData

    return (
      <Container>
        <Heading>Weather in {cityName}</Heading>
        <WeatherContainer>
          <Icon
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt='Weather icon'
          />
          <OrangeText>{temp}°C</OrangeText>
        </WeatherContainer>
        <BoldText>
          <p>{weather[0].description}</p>
          <p>Feels like: {Math.round(feels_like)}°C</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind Speed: {speed} m/s</p>
        </BoldText>
        <Text>
          Update in: {Math.floor(timeToUpdate / 60)} : {timeToUpdate % 60} s
        </Text>
        <Button background='lightGray' onClick={() => fetchWeatherData()}>
          Update Now
        </Button>
      </Container>
    )
  }

  return (
    <div>
      <WeatherDisplay weatherData={weatherData} />
    </div>
  )
}

export default Weather
