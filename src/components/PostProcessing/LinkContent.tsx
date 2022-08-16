import Arrow from 'icons/Arrow'
import classnames, {
  alignItems,
  display,
  space,
  width,
} from 'classnames/tailwind'

const linkInnerContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-2')
)

export default function ({ text }: { text: string }) {
  return (
    <div className={linkInnerContainer}>
      <span>{text}</span>
      <div className={width('w-4')}>
        <Arrow horizontal />
      </div>
    </div>
  )
}
