import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import Icon from './Icon.jsx'
import { useIcon } from '../hooks/useIcons.js'
import { styles } from '../styles/Footer.js'

const modalKeyframes = `
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }

    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`

const EmergencyConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <>
      <style>{modalKeyframes}</style>

      <div {...stylex.props(styles.modalOverlay)} onClick={onCancel}>
        <div {...stylex.props(styles.modalContent)} onClick={(e) => e.stopPropagation()}>
          <div {...stylex.props(styles.modalIcon)}>⚠️</div>

          <h3 {...stylex.props(styles.modalTitle)}>Emergency Call Confirmation</h3>

          <p {...stylex.props(styles.modalMessage)}>
            You are about to call{' '}
            <strong {...stylex.props(styles.modalEmergencyText)}>000 Emergency Services</strong>.
            <br />
            <br />
            Only proceed if this is a genuine emergency requiring immediate assistance from police,
            fire, or ambulance services.
          </p>

          <div {...stylex.props(styles.modalButtonContainer)}>
            <button {...stylex.props(styles.cancelButton)} onClick={onCancel}>
              Cancel
            </button>

            <button {...stylex.props(styles.confirmButton)} onClick={onConfirm}>
              Call 000 Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const Footer = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const footerBackground = useIcon('footer_bg')

  const handleEmergencyClick = (e) => {
    e.preventDefault()
    setShowEmergencyModal(true)
  }

  const handleConfirmCall = () => {
    setShowEmergencyModal(false)
    window.location.href = 'tel:000'
  }

  return (
    <>
      <footer
        {...stylex.props(styles.footerContainer)}
        style={
          footerBackground?.type === 'webp' || footerBackground?.type === 'png'
            ? { '--footer-bg-image': `url(${footerBackground.content})` }
            : undefined
        }
      >
        <a
          href="https://westallsc.vic.edu.au/"
          title="Visit Westall Secondary College Official Website"
          {...stylex.props(styles.footerLogoLink)}
        >
          <Icon
            name="footer_logo"
            alt="School Logo"
            draggable={false}
            {...stylex.props(styles.footerLogo)}
          />
        </a>

        <div {...stylex.props(styles.footerContent)}>
          <p {...stylex.props(styles.schoolName)}>Westall Secondary College</p>

          <a
            href="https://www.google.com/maps/place/Westall+Secondary+College/@-37.9403727,145.1338868,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad66b3392da9e91:0x4833dce0058551ef!8m2!3d-37.9403727!4d145.1364617!16s%2Fg%2F1tlbjq1w?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D"
            title="Visit School Address"
            {...stylex.props(styles.footerLink, styles.fadeUnderlineLink)}
          >
            88 Rosebank Ave, Clayton South 3169
          </a>

          <p {...stylex.props(styles.footerParagraph)}>
            <strong>In case of emergency </strong>
            at school:
            <br />
            Call{' '}
            <a
              href="#"
              onClick={handleEmergencyClick}
              title="Call Emergency Services (AU)"
              {...stylex.props(styles.highlightLink, styles.fadeUnderlineLink)}
            >
              000
            </a>
            , and note the school's address above.
          </p>

          <p {...stylex.props(styles.footerParagraph)}>
            <strong>Office Hours:</strong>
            <br />
            Mon–Fri: 8:30AM – 4:15PM
          </p>

          <p {...stylex.props(styles.footerParagraph)}>
            <strong>Contact Number:</strong>{' '}
            <a
              href="tel:+61395463233"
              title="Call School Reception"
              {...stylex.props(styles.footerLink, styles.fadeUnderlineLink)}
            >
              (03) 9546 3233
            </a>
          </p>

          <p {...stylex.props(styles.footerParagraph, styles.footerAccentText)}>
            <strong>Email:</strong>{' '}
            <a
              title="Email the School"
              href="mailto:westall.sc@education.vic.gov.au"
              {...stylex.props(styles.footerLink, styles.fadeUnderlineLink)}
            >
              westall.sc@education.vic.gov.au
            </a>
          </p>

          <p {...stylex.props(styles.footerParagraph, styles.footerAccentText)}>
            Copyright © Westall Secondary College 2025
          </p>

          <p {...stylex.props(styles.footerParagraph)}>
            Website owned by{' '}
            <a
              title="Westall Secondary College Website"
              href="https://westallsc.vic.edu.au/"
              {...stylex.props(styles.highlightLink, styles.fadeUnderlineLink)}
            >
              WSC
            </a>
            . Thank you so much for using this :3
          </p>
        </div>
      </footer>

      <EmergencyConfirmationModal
        isOpen={showEmergencyModal}
        onConfirm={handleConfirmCall}
        onCancel={() => setShowEmergencyModal(false)}
      />
    </>
  )
}

export default Footer