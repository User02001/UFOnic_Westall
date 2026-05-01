import * as stylex from '@stylexjs/stylex'

export const styles = stylex.create({
  homePage: {
    width: '100%',
    flex: 1,
    minHeight: 0,
    position: 'relative',
    marginTop: '5px',
  },

  homeContent: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    minHeight: 0,
  },

  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.1rem 0.1rem',
    paddingBottom: '2rem',
    zIndex: 2,
  },

  buttonCategories: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1.5rem, 3vw, 2rem)',
    maxWidth: 'min(1400px, 92vw)',
    width: '100%',
    padding: 'clamp(0.5rem, 1.5vw, 1rem)',
    isolation: 'isolate',
  },

  buttonCategoriesMobile: {
    gap: '3rem',
    padding: '10px 10px',
  },

  buttonCategory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },

  categoryHeader: {
    textAlign: 'center',
    padding: '8px 24px',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'visible',
    width: 'fit-content',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  },

  categoryHeaderMobile: {
    fontSize: '0.9rem',
    padding: '6px 18px',
    marginBottom: '1.5rem',
  },

  categoryHeaderLineLeft: {
    position: 'absolute',
    top: '50%',
    right: '100%',
    transform: 'translateY(-50%)',
    height: '2px',
    width: 'calc((90vw - 100%) / 2)',
    marginRight: '10px',
    zIndex: -2,
  },

  categoryHeaderLineRight: {
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translateY(-50%)',
    height: '2px',
    width: 'calc((90vw - 100%) / 2)',
    marginLeft: '10px',
    zIndex: -2,
  },

  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    rowGap: 'clamp(2rem, 4vw, 4rem)',
    columnGap: 'clamp(0.75rem, 2vw, 2rem)',
    width: '100%',
    justifyItems: 'center',
    alignItems: 'start',
  },

  categoryGridTablet: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },

  categoryGridMobile: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 'clamp(1.5rem, 6vw, 2rem) clamp(0.1rem, 2vw, 0.5rem)',
    justifyContent: 'center',
    justifyItems: 'center',
  },

  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    background: 'none',
    border: 'none',
    willChange: 'transform',
    width: 'fit-content',
    justifySelf: 'center',
    position: 'relative',
    overflow: 'visible',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.2s ease, filter 0.2s ease',
    filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
    ':hover': {
      transform: 'translateY(-6px) scale(1.08)',
      filter: 'drop-shadow(0px 12px 16px rgba(0, 0, 0, 0.35))',
    },
    ':active': {
      transform: 'translateY(-2px) scale(1.03)',
      filter: 'drop-shadow(0px 5px 8px rgba(0, 0, 0, 0.3))',
      transition: 'transform 0.08s ease, filter 0.08s ease',
    },
  },

  iconButtonMobile: {
    width: 'min(120px, 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  },

  iconImageWrap: {
    width: '72px',
    height: '72px',
    cursor: 'pointer',
    willChange: 'transform, filter',
    transition: 'transform 0.2s ease-in-out, filter 0.3s ease-in-out',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconImageWrapMobile: {
    width: '72px',
    height: '72px',
  },

  iconLabel: {
    fontSize: '1.1rem',
    whiteSpace: 'nowrap',
    marginTop: '0.75rem',
    pointerEvents: 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
  },

  iconLabelMobile: {
    fontSize: '1.1rem',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    textAlign: 'center',
    lineHeight: 1.2,
    maxWidth: '120px',
    marginTop: '0.75rem',
    pointerEvents: 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
  },

  iconUnderline: {
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
  },

  iconUnderlineVisible: {
    width: '100%',
  },

  iconButtonLightText: {
    color: '#000852',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
  },

  iconButtonDarkText: {
    color: '#ffffff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
  },

  iconUnderlineLight: {
    background: '#000852',
  },

  iconUnderlineDark: {
    background: '#ffffff',
  },

  category1Light: {
    background: 'linear-gradient(135deg, #ff7f50 0%, #ff6347 100%)',
    boxShadow: '0 2px 8px rgba(255, 127, 80, 0.3)',
  },
  category2Light: {
    background: 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)',
    boxShadow: '0 2px 8px rgba(218, 165, 32, 0.3)',
  },
  category3Light: {
    background: 'linear-gradient(135deg, #4682b4 0%, #1e90ff 100%)',
    boxShadow: '0 2px 8px rgba(70, 130, 180, 0.3)',
  },
  category4Light: {
    background: 'linear-gradient(135deg, #cd853f 0%, #d2691e 100%)',
    boxShadow: '0 2px 8px rgba(205, 133, 63, 0.3)',
  },
  category5Light: {
    background: 'linear-gradient(135deg, #9370db 0%, #8a2be2 100%)',
    boxShadow: '0 2px 8px rgba(147, 112, 219, 0.3)',
  },

  category1Dark: {
    background: 'linear-gradient(135deg, #ff7f50 0%, #ff4500 100%)',
    boxShadow: '0 2px 8px rgba(255, 127, 80, 0.35)',
  },
  category2Dark: {
    background: 'linear-gradient(135deg, #ffd700 0%, #daa520 100%)',
    boxShadow: '0 2px 8px rgba(218, 165, 32, 0.35)',
  },
  category3Dark: {
    background: 'linear-gradient(135deg, #87ceeb 0%, #4682b4 100%)',
    boxShadow: '0 2px 8px rgba(70, 130, 180, 0.35)',
  },
  category4Dark: {
    background: 'linear-gradient(135deg, #deb887 0%, #cd853f 100%)',
    boxShadow: '0 2px 8px rgba(205, 133, 63, 0.35)',
  },
  category5Dark: {
    background: 'linear-gradient(135deg, #da70d6 0%, #9370db 100%)',
    boxShadow: '0 2px 8px rgba(147, 112, 219, 0.35)',
  },
  iconMain: {
    position: 'relative',
    width: '100px',
    height: '100px',
    display: 'block',
    filter: 'drop-shadow(0 4px 5px rgba(0, 0, 0, 0.22))',

    '::before': {
      content: '""',
      position: 'absolute',
      top: '5%',
      left: '10%',
      width: '80%',
      height: '35%',
      borderRadius: '22px 22px 50% 50%',
      background:
        'linear-gradient(to bottom, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04), transparent)',
      pointerEvents: 'none',
      zIndex: 2,
    },
  },
})