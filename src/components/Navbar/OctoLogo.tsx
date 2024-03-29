import { displayFrom } from 'helpers/visibilityClassnames'
import OctoCorp from 'icons/OctoCorp'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  textColor,
  textDecoration,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)
const logoText = classnames(textColor('text-secondary'), displayFrom('md'))
const strikethroughLogo = classnames(
  textDecoration('line-through'),
  displayFrom('md')
)
const logoName = classnames(
  display('flex'),
  flexDirection('flex-col', 'tablet:flex-row'),
  alignItems('items-start', 'tablet:items-center'),
  gap('gap-x-2')
)

export default function () {
  return (
    <div className={wrapper}>
      <OctoCorp />
      <div className={logoName}>
        <span className={logoText}>OCTOCORP</span>
        <span className={strikethroughLogo}>SealCred | Echo</span>
      </div>
    </div>
  )
}
