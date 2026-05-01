import * as stylex from '@stylexjs/stylex'
import { useState, useEffect } from 'react'
import { useWeatherWidget } from '../hooks/useWeatherWidget.js'
import { styles } from '../styles/WeatherWidget.js'

const WeatherWidget = ({ theme = 'light' }) => {
  const { temperatureDisplay, icon, description, location, loading, error } = useWeatherWidget()
  const [visible, setVisible] = useState(false)
  const [prevLoading, setPrevLoading] = useState(true)

  useEffect(() => {
    if (prevLoading === loading) return
    setVisible(false)
    const t = window.setTimeout(() => {
      setPrevLoading(loading)
      window.setTimeout(() => setVisible(true), 50)
    }, 400)
    return () => window.clearTimeout(t)
  }, [loading])

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 50)
    return () => window.clearTimeout(t)
  }, [])

  const textTone = theme === 'dark' ? styles.darkText : styles.lightText
  const fade = stylex.props(styles.fadeWrapper, visible ? styles.visible : styles.hidden)

  if (prevLoading) {
    return (
      <div {...stylex.props(styles.container)}>
        <div {...fade}>
          <div {...stylex.props(styles.loading, textTone)}>
            <div {...stylex.props(styles.spinner)} />
            <span>Weather</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div {...stylex.props(styles.container)}>
        <div {...fade}>
          <div {...stylex.props(styles.error, textTone)}>{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...fade}>
        <div {...stylex.props(styles.main)}>
          <span {...stylex.props(styles.icon)}>{icon}</span>
          <span {...stylex.props(styles.temp, textTone)}>{temperatureDisplay}</span>
        </div>
        {description && (
          <div {...stylex.props(styles.description, textTone)}>{description}</div>
        )}
        <div {...stylex.props(styles.location, textTone)}>{location}</div>
      </div>
    </div>
  )
}

export default WeatherWidget