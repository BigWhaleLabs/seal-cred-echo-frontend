import { HTMLAttributes } from 'preact/compat'
import classnames, {
  cursor,
  stroke,
  strokeWidth,
  width,
} from 'classnames/tailwind'

const strokeStyle = classnames(
  strokeWidth('stroke-2'),
  stroke('stroke-formal-accent')
)

const svgWrapper = classnames(width('w-4'), cursor('cursor-pointer'))

export default function (props: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={svgWrapper} {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line
          className={strokeStyle}
          x1="5.41"
          y1="5"
          x2="19"
          y2="18.64"
          stroke-linecap="round"
        />
        <line
          x1="4.94"
          y1="18.64"
          x2="18.59"
          y2="5"
          className={strokeStyle}
          stroke-linecap="round"
        />
      </svg>
    </span>
  )
}
