import OctoCorp from 'icons/OctoCorp'
import classnames, {
  alignItems,
  display,
  gap,
  margin,
  textColor,
  textDecoration,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)
const logoText = classnames(
  textColor('text-secondary'),
  display('hidden', 'sm:block')
)
const deadLogo = classnames(
  textDecoration('line-through'),
  margin('ml-2'),
  display('hidden', 'md:block')
)

export default function () {
  return (
    <div className={wrapper}>
      <OctoCorp />
      <span className={logoText}>OCTOCORP</span>
      <span className={deadLogo}>SealCred | Echo</span>
    </div>
  )
}
