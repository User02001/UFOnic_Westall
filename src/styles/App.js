import * as stylex from '@stylexjs/stylex'

export const styles = stylex.create({
  appBody: {
    width: '100%',
    overflowX: 'hidden',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: '140px',
    isolation: 'isolate',

    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: -2,
      backgroundImage: 'var(--app-bg-image)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },

    '@media (max-width: 780px)': {
      paddingTop: '150px',
      backgroundImage: 'none',
      background: 'linear-gradient(to right, #ffffff 0%, #ffff88 100%)',

      '::before': {
        backgroundImage: 'none',
        background:
          'linear-gradient(to right, #ffffff 0%, #ffff88 100%)',
        backgroundColor: 'transparent',
      },

      '::after': {
        backgroundColor: 'transparent',
      },
    },
  },
})