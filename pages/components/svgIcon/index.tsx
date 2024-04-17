
import { twMerge } from 'tailwind-merge'
import { ReactSVG } from 'react-svg'

interface ISvgIconProps {
  className?: string
  src: any
  wrapper?: 'span' | 'div' | 'svg'
  onClick?: () => void
  onAnimationEnd?: () => void
}

/**
 * Svg组件
 * @param 
 */
export default function SvgIcon({
  className,
  src,
  wrapper = 'div',
  onClick = () => { },
  onAnimationEnd = () => { },
}: ISvgIconProps) {
  return (
    <ReactSVG
      wrapper={wrapper}
      className={twMerge('tz-svg-icon', className)}
      src={src}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
    />
  )
}
