import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const pathClasses = classnames(
  strokeWidth('stroke-2'),
  stroke('stroke-current')
)

export default function () {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClasses}
        d="M15 8L1.5 8M1.5 8L8 14.5M1.5 8L8 1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
