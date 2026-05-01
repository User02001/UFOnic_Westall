import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as stylex from '@stylexjs/stylex'
import { styles } from '../styles/Header.js'
import Icon from './Icon.jsx'
import WeatherWidget from './WeatherWidget.jsx'
import { useIcon } from '../hooks/useIcons.js'

const NAV_ITEMS = [
  {
    href: '/',
    icon: 'home_header',
    label: 'Home',
    title: 'Go to home page',
    buttonKey: 'header-home',
  },
  {
    href: 'https://westallsc-vic.compass.education/',
    icon: 'compass_header',
    label: 'Compass',
    title: 'Open Compass',
    external: true,
    buttonKey: 'header-compass',
  },
  {
    href: '/bell-times',
    icon: 'bell_header',
    label: 'Bell Times',
    title: 'View bell times',
    buttonKey: 'header-bell-times',
  },
  {
    href: '/school-map',
    icon: 'school_map_header',
    label: 'School Map',
    title: 'View school map',
    buttonKey: 'header-school-map',
  },
  {
    href: '/it-support',
    icon: 'it_support_header',
    label: 'IT Support',
    title: 'Get IT support',
    buttonKey: 'header-it-support',
  },
  {
    href: '/faqs',
    icon: 'faqs_header',
    label: 'FAQs',
    title: 'View frequently asked questions',
    buttonKey: 'header-faqs',
  },
]

const useThemeMode = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light'
    return document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    const observer = new MutationObserver(() => {
      setTheme(document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

const Header = () => {
  const animatingButtons = useRef(new Set())
  const headerBackground = useIcon('header_bg')
  const theme = useThemeMode()

  const handleMouseEnter = (event, buttonKey) => {
    const button = event.currentTarget
    if (animatingButtons.current.has(buttonKey)) return
    animatingButtons.current.add(buttonKey)
    button.classList.add('animating')
    window.setTimeout(() => {
      animatingButtons.current.delete(buttonKey)
      button.classList.remove('animating')
    }, 350)
  }

  return (
    <header
      {...stylex.props(styles.siteHeader)}
      style={
        headerBackground?.type === 'webp' || headerBackground?.type === 'png'
          ? { '--header-bg-image': `url(${headerBackground.content})` }
          : undefined
      }
    >
      <WeatherWidget theme={theme} />
      <div {...stylex.props(styles.headerCenter)}>
        <div {...stylex.props(styles.homeLogoWrapper)}>
          <Link
            to="/"
            title="UFOnic Westall Home"
            aria-label="Go to UFOnic Westall home page"
            {...stylex.props(styles.homeLogoLink)}
          >
            <Icon
              name="main_logo"
              alt="UFOnic Westall logo"
              draggable={false}
              {...stylex.props(styles.homeLogoIcon)}
            />
          </Link>
        </div>

        <nav aria-label="Primary navigation" {...stylex.props(styles.headerNav)}>
          {NAV_ITEMS.map(({ href, icon, label, title, external, buttonKey }) => {
            if (external) {
              return (
                <a
                  key={href}
                  href={href}
                  title={title}
                  aria-label={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-button-key={buttonKey}
                  onMouseEnter={(e) => handleMouseEnter(e, buttonKey)}
                  {...stylex.props(styles.headerNavLink)}
                >
                  <Icon
                    name={icon}
                    alt={label}
                    draggable={false}
                    {...stylex.props(styles.headerNavIcon)}
                  />
                </a>
              )
            }

            return (
              <Link
                key={href}
                to={href}
                title={title}
                aria-label={title}
                data-button-key={buttonKey}
                onMouseEnter={(e) => handleMouseEnter(e, buttonKey)}
                {...stylex.props(styles.headerNavLink)}
              >
                <Icon
                  name={icon}
                  alt={label}
                  draggable={false}
                  {...stylex.props(styles.headerNavIcon)}
                />
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header