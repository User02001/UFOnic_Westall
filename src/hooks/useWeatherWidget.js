import { useState, useEffect } from 'react'

const getWeatherIcon = (weatherCode, isDay) => {
  const iconMap = {
    0: isDay ? '☀️' : '🌙',
    1: isDay ? '🌤️' : '🌙',
    2: isDay ? '⛅' : '☁️',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌦️',
    56: '🌦️',
    57: '🌦️',
    61: '🌧️',
    63: '🌧️',
    65: '🌧️',
    66: '🌧️',
    67: '🌧️',
    71: '❄️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌦️',
    81: '🌦️',
    82: '🌦️',
    85: '🌨️',
    86: '🌨️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
  }
  return iconMap[weatherCode] ?? (isDay ? '☀️' : '🌙')
}

const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  }
  return descriptions[weatherCode] ?? 'Unknown'
}

export const useWeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: null,
    weatherCode: null,
    isDay: true,
    loading: true,
    error: null,
  })

  const fetchWeather = async (isRefresh = false) => {
    try {
      setWeather(prev => ({ ...prev, loading: isRefresh ? prev.loading : true, error: null }))

      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-37.9319&longitude=145.0555&current=temperature_2m,weather_code,is_day&timezone=Australia/Melbourne&forecast_days=1'
      )

      if (!response.ok) throw new Error(`Weather API error: ${response.status}`)

      const data = await response.json()
      const current = data.current

      setWeather({
        temperature: Math.round(current.temperature_2m),
        weatherCode: current.weather_code,
        isDay: current.is_day === 1,
        loading: false,
        error: null,
      })
    } catch (err) {
      console.error('Weather fetch error:', err)
      setWeather(prev => ({ ...prev, loading: false, error: 'Weather unavailable' }))
    }
  }

  useEffect(() => {
    fetchWeather()
    const interval = setInterval(() => fetchWeather(true), 60000)
    return () => clearInterval(interval)
  }, [])

  return {
    ...weather,
    icon: weather.weatherCode !== null ? getWeatherIcon(weather.weatherCode, weather.isDay) : '🌤️',
    description: weather.weatherCode !== null ? getWeatherDescription(weather.weatherCode) : '',
    temperatureDisplay: weather.temperature !== null ? `${weather.temperature}°C` : '--°C',
    location: 'Westall SC, VIC',
  }
}