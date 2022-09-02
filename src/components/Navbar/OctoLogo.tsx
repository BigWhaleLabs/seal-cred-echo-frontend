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
const logoText = textColor('text-secondary')
const deadLogo = classnames(textDecoration('line-through'), margin('ml-2'))

export default function () {
  return (
    <div className={wrapper}>
      <OctoCorp />
      <span className={logoText}>OCTOCORP</span>
      <span className={deadLogo}>SealCred | Echo</span>
    </div>
  )
}
