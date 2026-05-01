import { useId, useMemo } from 'react'
import { useIcon } from '../hooks/useIcons.js'

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const uniquifySvgIds = (svg, prefix) => {
  const idRegex = /\bid="([^"]+)"/g
  const originalIds = Array.from(svg.matchAll(idRegex)).map((match) => match[1])

  if (originalIds.length === 0) {
    return svg
  }

  let nextSvg = svg

  for (const originalId of originalIds) {
    const safeOriginalId = escapeRegExp(originalId)
    const newId = `${prefix}-${originalId}`

    nextSvg = nextSvg.replace(
      new RegExp(`id="${safeOriginalId}"`, 'g'),
      `id="${newId}"`
    )

    nextSvg = nextSvg.replace(
      new RegExp(`url\\(#${safeOriginalId}\\)`, 'g'),
      `url(#${newId})`
    )

    nextSvg = nextSvg.replace(
      new RegExp(`#${safeOriginalId}"`, 'g'),
      `#${newId}"`
    )

    nextSvg = nextSvg.replace(
      new RegExp(`#${safeOriginalId}'`, 'g'),
      `#${newId}'`
    )

    nextSvg = nextSvg.replace(
      new RegExp(`href="#${safeOriginalId}"`, 'g'),
      `href="#${newId}"`
    )

    nextSvg = nextSvg.replace(
      new RegExp(`xlink:href="#${safeOriginalId}"`, 'g'),
      `xlink:href="#${newId}"`
    )
  }

  return nextSvg
}

const Icon = ({
  name,
  className,
  style,
  alt,
  title,
  onClick,
  draggable = false,
  ...props
}) => {
  const iconData = useIcon(name)
  const reactId = useId()
  const svgPrefix = `icon-${name}-${reactId.replace(/:/g, '')}`

  const safeSvgContent = useMemo(() => {
    if (!iconData || iconData.type !== 'svg') {
      return null
    }

    return uniquifySvgIds(iconData.content, svgPrefix)
  }, [iconData, svgPrefix])

  if (!iconData) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  if (iconData.type === 'svg') {
    return (
      <div
        className={className}
        style={style}
        title={title || alt}
        aria-label={alt}
        onClick={onClick}
        draggable={draggable}
        dangerouslySetInnerHTML={{ __html: safeSvgContent || iconData.content }}
        {...props}
      />
    )
  }

  if (iconData.type === 'png' || iconData.type === 'webp') {
    return (
      <img
        src={iconData.content}
        alt={alt}
        title={title || alt}
        className={className}
        style={style}
        onClick={onClick}
        draggable={draggable}
        {...props}
      />
    )
  }

  return null
}

export default Icon