import * as stylex from '@stylexjs/stylex'

export const styles = stylex.create({
  siteHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '140px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'var(--header-bg-image, none)',
    backgroundColor: 'var(--header-bg-color, transparent)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    overflow: 'visible',
    paddingTop: '10px',
    paddingBottom: '10px',
    boxShadow: 'var(--header-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1))',
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      width: '100%',
      height: '5px',
      zIndex: 3,
      backgroundColor: 'var(--header-strip-color, #FAFF00)',
      boxShadow: 'var(--header-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1))',
    },
    '@media (max-width: 780px)': {
      minHeight: '150px',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },

  headerCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '0.5rem',
    maxHeight: '100%',
    marginTop: '-0.75rem',
  },

  homeLogoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: 'fit-content',
    alignSelf: 'center',
    marginTop: '10px',
  },

  homeLogoLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    zIndex: 3,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: 'fit-content',
    transition: 'transform 0.3s ease',
    willChange: 'transform',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },

  homeLogoIcon: {
    width: '92px',
    height: 'auto',
    objectFit: 'contain',
    pointerEvents: 'none',
    filter: 'var(--header-logo-filter, none)',
    animation: 'var(--header-logo-animation, none)',
    position: 'relative',
    marginBottom: '6px',
    top: '2px',
  },

  headerNav: {
    display: 'flex',
    gap: 'clamp(0.4rem, calc(10vw - 5rem), 0.85rem)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'calc(-1rem + -0.5vh)',
    flexWrap: 'nowrap',
  },

  headerNavLink: {
    '--nav-button-size': '42px',
    '--nav-icon-size': '30px',
    marginTop: '18px',
    width: 'var(--nav-button-size)',
    height: 'var(--nav-button-size)',
    padding: 0,
    boxSizing: 'border-box',
    cursor: 'pointer',
    textDecoration: 'none',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    WebkitTapHighlightColor: 'transparent',
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.26), rgba(255,255,255,0.07))',
    border: '1.5px solid rgba(255,255,255,0.62)',
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    willChange: 'transform',

    '@media (max-width: 780px)': {
      '--nav-button-size': '45px',
      '--nav-icon-size': '30px',
    },

    '@media (max-width: 480px)': {
      '--nav-button-size': '35px',
      '--nav-icon-size': '28px',
    },

    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        transform: 'scale(1.08) translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.22)',
      },
    },
  },

  headerNavIcon: {
    width: 'var(--nav-icon-size)',
    height: 'var(--nav-icon-size)',
    display: 'block',
    pointerEvents: 'none',
    flexShrink: 0,
    position: 'relative',
    zIndex: 1,
    filter:
      'drop-shadow(0 4px 8px rgba(0,0,0,0.22)) inset 0 1px 2px rgba(255,255,255,0.7)',
  },
})