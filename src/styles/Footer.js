import * as stylex from '@stylexjs/stylex'

export const styles = stylex.create({
  footerContainer: {
    backgroundImage: 'var(--footer-bg-image, none)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    fontSize: '16px',
    zIndex: 2,
    color: 'var(--footer-text-color, #ffffff)',
    backgroundColor: 'var(--footer-bg-color, transparent)',
  },

  footerLogoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    textDecoration: 'none',
    transition: 'transform 0.25s ease',
    willChange: 'transform',

    ':hover': {
      transform: 'scale(1.06)',
    },
  },

  footerLogo: {
    height: '120px',
    width: 'auto',
    pointerEvents: 'none',
  },

  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  schoolName: {
    margin: '2px 0',
    lineHeight: '1.5',
    fontSize: '18px',
    fontWeight: 'bold',
  },

  footerParagraph: {
    margin: '2px 0',
    lineHeight: '1.5',
  },

  footerAccentText: {
    color: 'var(--footer-accent-color, var(--brand-yellow, #FAFF00))',
  },

  footerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },

  highlightLink: {
    textDecoration: 'none',
    color: 'var(--footer-highlight-color, yellow)',
    fontWeight: 'bold',
  },

  fadeUnderlineLink: {
    textDecorationLine: 'underline',
    textDecorationColor: 'transparent',
    textUnderlineOffset: '0.2em',
    textDecorationThickness: '1.5px',
    textDecorationSkipInk: 'none',
    transition: 'text-decoration-color 0.22s ease',

    ':hover': {
      textDecorationColor: 'currentColor',
    },
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    border: '3px solid #dc2626',
    animation: 'modalSlideIn 0.3s ease-out',
  },

  modalIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: '#fee2e2',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontSize: '32px',
    color: '#dc2626',
  },

  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
  },

  modalMessage: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '30px',
  },

  modalEmergencyText: {
    color: '#dc2626',
  },

  modalButtonContainer: {
    display: 'flex',
    gap: '12px',
  },

  cancelButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: '#e5e7eb',
    },
  },

  confirmButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(220, 38, 38, 0.3)',

    ':hover': {
      backgroundColor: '#b91c1c',
    },
  },
})