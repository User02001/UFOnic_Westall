import { useMemo } from 'react'

const svgIcons = import.meta.glob('/src/assets/icons/svg/*.svg', {
  query: '?raw',
  eager: true,
  import: 'default',
})

const pngIcons = import.meta.glob('/src/assets/icons/png/*.png', {
  eager: true,
  import: 'default',
})

const webpIcons = import.meta.glob('/src/assets/icons/webp/*.webp', {
  eager: true,
  import: 'default',
})

export const useIcon = (name) => {
  return useMemo(() => {
    const svgPath = `/src/assets/icons/svg/${name}.svg`
    if (svgIcons[svgPath]) {
      return { type: 'svg', content: svgIcons[svgPath] }
    }

    const pngPath = `/src/assets/icons/png/${name}.png`
    if (pngIcons[pngPath]) {
      return { type: 'png', content: pngIcons[pngPath] }
    }

    const webpPath = `/src/assets/icons/webp/${name}.webp`
    if (webpIcons[webpPath]) {
      return { type: 'webp', content: webpIcons[webpPath] }
    }

    return null
  }, [name])
}