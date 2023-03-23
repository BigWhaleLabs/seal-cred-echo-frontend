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
      <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line
          className={strokeStyle}
          stroke-linecap="round"
          x1="5.41"
          x2="19"
          y1="5"
          y2="18.64"
        />
        <line
          className={strokeStyle}
          stroke-linecap="round"
          x1="4.94"
          x2="18.59"
          y1="18.64"
          y2="5"
        />
      </svg>
    </span>
  )
}
