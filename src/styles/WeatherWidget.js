import * as stylex from '@stylexjs/stylex'

export const styles = stylex.create({
  fadeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.4rem',
    transition: 'opacity 0.4s ease',
  },

  visible: {
    opacity: 1,
  },

  hidden: {
    opacity: 0,
  },

  container: {
    position: 'absolute',
    top: '38%',
    left: '40px',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.4rem',
    zIndex: 20,
    pointerEvents: 'none',
    maxWidth: '220px',
    '@media (max-width: 1024px)': {
      top: '36%',
      left: '22px',
      maxWidth: '190px',
    },
    '@media (max-width: 780px)': {
      top: '30%',
      left: '15px',
      maxWidth: '140px',
      gap: '0.25rem',
    },
    '@media (max-width: 480px)': {
      top: '32%',
      left: '12px',
      maxWidth: '120px',
      gap: '0.2rem',
    },
  },

  main: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },

  icon: {
    fontSize: '1.8rem',
    lineHeight: 1,
    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))',
    '@media (max-width: 1024px)': {
      fontSize: '1.6rem',
    },
    '@media (max-width: 780px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
  },

  temp: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1,
    textShadow: '2px 2px 3px rgba(0, 0, 0, 0.6)',
    '@media (max-width: 1024px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 780px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
  },

  description: {
    fontSize: '0.9rem',
    fontWeight: 500,
    opacity: 0.95,
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
    textTransform: 'capitalize',
    lineHeight: 1.2,
    '@media (max-width: 1024px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 780px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.6rem',
    },
  },

  location: {
    fontSize: '0.8rem',
    fontWeight: 500,
    opacity: 0.9,
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    lineHeight: 1.2,
    '@media (max-width: 1024px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 780px)': {
      fontSize: '0.65rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.55rem',
    },
  },

  error: {
    fontSize: '0.8rem',
    opacity: 0.85,
  },

  loading: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.8rem',
    opacity: 0.85,
  },

  spinner: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    borderTop: '2px solid currentColor',
    borderRight: '2px solid currentColor',
    borderBottom: '2px solid transparent',
    borderLeft: '2px solid transparent',
    animationName: 'weatherSpin',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },

  lightText: {
    color: '#ffffff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  },

  darkText: {
    color: '#dfe9ff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  },
})