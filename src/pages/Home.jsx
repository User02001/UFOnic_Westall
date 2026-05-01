import { useEffect, useMemo, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import TimeDisplayer from '../components/TimeDisplayer.jsx'
import { useIcon } from '../hooks/useIcons.js'
import { styles } from '../styles/Home.js'

const ICON_SIZE = '100px'

const buttonCategories = [
  {
    title: 'School Essentials',
    buttons: [
      ['https://westallsc-vic.compass.education/', 'compass', 'Compass', false],
      ['https://outlook.office.com/mail/', 'outlook', 'Outlook Email', false],
      ['https://westallsc.vic.edu.au/', 'westallweb', "Westall's Website", false],
      ['/bell-times', 'bell', 'Bell Times', true],
      ['/school-map', 'schoollay', 'School Map', true],
      ['https://print.westallsc.vic.edu.au', 'print', 'Printing Job', false],
    ],
  },
  {
    title: 'Learning Platforms',
    buttons: [
      ['/nomnuud', 'textbooks', 'Textbooks', true],
      ['https://edrolo.com.au/account/login/?next=/account/courses/', 'edrolo', 'Edrolo', false],
      ['https://hub.oxforddigital.com.au/library.html', 'oxford', 'Oxford Digital', false],
      ['https://platform.mangahigh.com/en-au/login/student', 'mangahigh', 'Mangahigh', false],
      ['https://iam.educationperfect.com/oauth2/authorize?client_id=53770139-f524-c00a-26fe-b950fb0fe91e&response_type=code&redirect_uri=https%3a%2f%2fauthentication.educationperfect.com%2foauth-redirect&scope=offline_access&state=eyJ0YXJnZXRfbGlua191cmkiOiJodHRwczovL2FwcC5lZHVjYXRpb25wZXJmZWN0LmNvbS8%2fbG9naW5fYXR0ZW1wdD0xIiwicmZwIjoiZ0pjcWN4VFU2Mlc1MGVJUytLSUpvNGtTU0QrZE51SDBRYUY2RzJRcjdpVT0ifQ%3d%3d', 'ep', 'Education Perfect', false],
      ['https://online.clickview.com.au/login?returnUrl=%2F&prompt=true', 'clickview', 'Clickview', false],
    ],
  },
  {
    title: 'Maths, Testing & Assessment',
    buttons: [
      ['https://oars.acer.edu.au/westall-secondary-college', 'acer', 'Acer PAT Test', false],
      ['https://mathspace.co/accounts/login/', 'mathspace', 'Mathspace', false],
      ['https://app.essentialassessment.com.au/student/', 'ea', 'Essential Assessment', false],
      ['https://mathsstarters.net/examtimer', 'examtimer', 'Exam Timer', false],
      ['https://www.desmos.com/calculator', 'desmos_graph', 'Desmos Graphing', false],
      ['https://www.desmos.com/scientific', 'desmos_scientific', 'Desmos Calculator', false],
    ],
  },
  {
    title: 'Creative & Digital Tools',
    buttons: [
      ['https://www.tinkercad.com/dashboard', 'tinkercad', 'Tinkercad', false],
      ['https://canva.com', 'canva', 'Canva', false],
      ['https://www.affinity.studio/get-affinity', 'affinity', 'Affinity', false],
      ['https://docs.google.com/document/u/0/', 'slides', 'Google Slides', false],
      ['https://auth.services.adobe.com/en_US/index.html?client_id=adobedotcom-cc&redirect_uri=https%3A%2F%2Fwww.adobe.com&response_type=token&scope=AdobeID%2Copenid', 'adobe', 'Adobe Creative Cloud', false],
      ['https://youtube.com', 'youtube', 'YouTube', false],
    ],
  },
  {
    title: 'Microsoft & Communication',
    buttons: [
      ['https://office.com', 'microsoft365', 'Microsoft 365', false],
      ['https://teams.microsoft.com', 'teams', 'Microsoft Teams', false],
      ['https://gmail.com', 'gmail', 'Gmail', false],
      ['https://uchat.ufonic.xyz', 'uchat', 'uChat', false],
      ['https://kahoot.it', 'kahoot', 'Kahoot', false],
      ['https://ufo.westallsc.vic.edu.au', 'wufo', 'Westall UFO', false],
    ],
  },
  {
    title: 'Careers, Support & Other',
    buttons: [
      ['/handbooks', 'handbook', 'Handbooks', true],
      ['https://resourcecentre.westallsc.vic.edu.au/WST14/#!dashboard', 'library', 'Westall Library', false],
      ['https://westallcareers.com', 'careers', 'Westall Careers', false],
      ['https://vtac.edu.au', 'vtac', 'VTAC', false],
      ['https://stateschoolsrelief.org.au/', 'ssr', 'State School Relief', false],
      ['/career_matrix', 'careermatrix', 'Career Matrix', true],
    ],
  },
  {
    title: 'Accounts & Local Tools',
    buttons: [
      ['https://edupasspasswordreset.education.vic.gov.au/default.aspx', 'passwordreset', 'EduPass Reset', false],
      ['https://edupassmyaccount.education.vic.gov.au/', 'passwordchange', 'EduPass Change', false],
      ['/weather', 'weather', 'Westall Weather', true],
      ['/map', 'maps', 'Maps', true],
    ],
  },
]

const useResponsive = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  )

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return {
    isMobile: width <= 780,
    isTablet: width <= 1200 && width >= 781,
  }
}

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

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return theme
}

const getCategoryTone = (index, theme) => {
  const light = [
    styles.category1Light,
    styles.category2Light,
    styles.category3Light,
    styles.category4Light,
    styles.category5Light,
  ]

  const dark = [
    styles.category1Dark,
    styles.category2Dark,
    styles.category3Dark,
    styles.category4Dark,
    styles.category5Dark,
  ]

  return theme === 'dark' ? dark[index] || dark[0] : light[index] || light[0]
}

const ButtonLink = ({
  button,
  buttonKey,
  isMobile,
  textTone,
  underlineTone,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) => {
  const [href, iconName, label, isInternal] = button
  const [isAnimating, setIsAnimating] = useState(false)
  const mobileClickingRef = useRef(false)
  const iconData = useIcon(iconName)

  const inlineStyle =
    iconData && (iconData.type === 'png' || iconData.type === 'webp')
      ? { '--button-bg-image': `url(${iconData.content})` }
      : undefined

  const triggerAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    window.setTimeout(() => setIsAnimating(false), 350)
  }

  const handleMouseEnter = () => {
    triggerAnimation()
    onHoverStart(buttonKey)
  }

  const handleMouseLeave = () => {
    onHoverEnd(buttonKey)
  }

  const handleClick = (e) => {
    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    e.preventDefault()

    if (mobileClickingRef.current) return
    mobileClickingRef.current = true

    const currentTarget = e.currentTarget
    currentTarget.classList.add('mobileClicking')

    const isExternal = !isInternal

    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }

    window.setTimeout(() => {
      currentTarget.classList.remove('mobileClicking')
      mobileClickingRef.current = false

      if (!isExternal) {
        window.location.href = href
      }
    }, 400)
  }

  const content = (
    <>
      <Icon
        name={iconName}
        alt={label}
        title={label}
        draggable={false}
        className={`ufonic-main-icon ${isAnimating ? 'ufonic-icon-animating' : ''}`}
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
      />

      <span
        {...stylex.props(
          styles.iconLabel,
          isMobile && styles.iconLabelMobile
        )}
      >
        {label}
        <span
          {...stylex.props(
            styles.iconUnderline,
            underlineTone,
            isHovered && styles.iconUnderlineVisible
          )}
        />
      </span>
    </>
  )

  if (isInternal) {
    return (
      <Link
        to={href}
        title={label}
        data-button-key={buttonKey}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={inlineStyle}
        {...stylex.props(
          styles.iconButton,
          isMobile && styles.iconButtonMobile,
          textTone
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      data-button-key={buttonKey}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={inlineStyle}
      {...stylex.props(
        styles.iconButton,
        isMobile && styles.iconButtonMobile,
        textTone
      )}
    >
      {content}
    </a>
  )
}

const Home = () => {
  setTitle('home');
  const { isMobile, isTablet } = useResponsive()
  const theme = useThemeMode()
  const [hoveredKey, setHoveredKey] = useState(null)

  const textTone =
    theme === 'dark' ? styles.iconButtonDarkText : styles.iconButtonLightText
  const underlineTone =
    theme === 'dark' ? styles.iconUnderlineDark : styles.iconUnderlineLight

  const categories = useMemo(() => buttonCategories, [])

  return (
    <main {...stylex.props(styles.homePage)}>
      <TimeDisplayer isMobile={isMobile} theme={theme} />
      <div {...stylex.props(styles.homeContent)}>
        <main {...stylex.props(styles.mainContent)}>
          <div
            {...stylex.props(
              styles.buttonCategories,
              isMobile && styles.buttonCategoriesMobile
            )}
          >
            {categories.map((category, categoryIndex) => {
              const tone = getCategoryTone(categoryIndex, theme)

              return (
                <div key={category.title} {...stylex.props(styles.buttonCategory)}>
                  <div
                    {...stylex.props(
                      styles.categoryHeader,
                      isMobile && styles.categoryHeaderMobile,
                      tone
                    )}
                  >
                    <div {...stylex.props(styles.categoryHeaderLineLeft, tone)} />
                    {category.title}
                    <div {...stylex.props(styles.categoryHeaderLineRight, tone)} />
                  </div>

                  <div
                    {...stylex.props(
                      styles.categoryGrid,
                      isTablet && styles.categoryGridTablet,
                      isMobile && styles.categoryGridMobile
                    )}
                  >
                    {category.buttons.map((button, buttonIndex) => {
                      const buttonKey = `button-${categoryIndex}-${buttonIndex}`

                      return (
                        <ButtonLink
                          key={buttonKey}
                          button={button}
                          buttonKey={buttonKey}
                          isMobile={isMobile}
                          textTone={textTone}
                          underlineTone={underlineTone}
                          isHovered={hoveredKey === buttonKey}
                          onHoverStart={setHoveredKey}
                          onHoverEnd={(key) => {
                            setHoveredKey((current) => (current === key ? null : current))
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </main>
  )
}

export default Home