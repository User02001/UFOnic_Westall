import { useEffect, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { useDateTime } from '../hooks/useDateTime.js'
import { styles } from '../styles/TimeDisplayer.js'

const TimeDisplayer = ({ isMobile, theme }) => {
  const { dateTime, termWeek, weekType, periodText, lateNight, showTimezoneWarning } = useDateTime()
  const [showTimezonePopup, setShowTimezonePopup] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 480 : false
  )

  useEffect(() => {
    const handleResize = () => setIsSmallMobile(window.innerWidth <= 480)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTimezonePopup && !event.target.closest('[data-timezone-warning-container="true"]')) {
        setShowTimezonePopup(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showTimezonePopup])

  const textTone          = theme === 'dark' ? styles.darkText                  : styles.lightText
  const warningButtonTone = theme === 'dark' ? styles.timezoneWarningButtonDark : styles.timezoneWarningButtonLight
  const popupTone         = theme === 'dark' ? styles.timezonePopupDark         : styles.timezonePopupLight

  const termWeekLine = termWeek && weekType
    ? `${termWeek} | ${weekType}`
    : termWeek || weekType

  return (
    <div {...stylex.props(styles.periodContent, isMobile && styles.periodContentMobile)}>
      <div {...stylex.props(styles.timeContainer, isMobile && styles.timeContainerMobile)}>

        <div {...stylex.props(styles.timeRow)}>
          <div {...stylex.props(styles.dateTimeGroup, isMobile && styles.dateTimeGroupMobile)}>
            <div
              title="Date & Time"
              {...stylex.props(styles.timeText, isMobile && styles.timeTextMobile, textTone)}
            >
              {dateTime}
            </div>

            {showTimezoneWarning && (
              <div
                data-timezone-warning-container="true"
                {...stylex.props(styles.timezoneWarningContainer)}
              >
                <button
                  type="button"
                  title="Timezone Warning"
                  onClick={() => setShowTimezonePopup((c) => !c)}
                  {...stylex.props(
                    styles.timezoneWarningButton,
                    isMobile && styles.timezoneWarningButtonMobile,
                    warningButtonTone
                  )}
                >
                  !
                </button>

                <div
                  {...stylex.props(
                    styles.timezonePopup,
                    isMobile && styles.timezonePopupMobile,
                    isSmallMobile && styles.timezonePopupSmallMobile,
                    popupTone,
                    showTimezonePopup ? styles.timezonePopupVisible : styles.timezonePopupHidden
                  )}
                >
                  Your timezone is different from Westall, likely due to a glitch OR you perhaps could actually be in a different timezone. If you believe this is a glitch, contact us.
                </div>
              </div>
            )}
          </div>
        </div>

        {lateNight && (
          <div {...stylex.props(styles.timeRow)}>
            <div
              title="Please sleep..."
              {...stylex.props(styles.timeText, isMobile && styles.timeTextMobile, textTone)}
            >
              {periodText}
            </div>
          </div>
        )}

        {!lateNight && termWeekLine && (
          <div {...stylex.props(styles.timeRow)}>
            <div
              title="Term, Week & Type"
              {...stylex.props(styles.timeText, isMobile && styles.timeTextMobile, textTone)}
            >
              {termWeekLine}
            </div>
          </div>
        )}

        {!lateNight && periodText && (
          <div {...stylex.props(styles.timeRow)}>
            <div
              title="Period Info"
              {...stylex.props(styles.timeText, isMobile && styles.timeTextMobile, textTone)}
            >
              {periodText}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default TimeDisplayer