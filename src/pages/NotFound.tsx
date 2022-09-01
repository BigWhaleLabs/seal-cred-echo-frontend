import Button from 'components/Button'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  dropShadow,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  textAlign,
  textColor,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  height('h-screen-80'),
  textAlign('text-center')
)
const octoBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center')
)
const bgGradients = classnames()
const strokeText = classNamesToString(
  classnames(
    textColor('text-transparent'),
    dropShadow('drop-shadow-secondary'),
    fontSize('text-8xl'),
    fontFamily('font-primary'),
    fontWeight('font-bold')
  ),
  'stroke-text-secondary'
)

export default function () {
  return (
    <div className={container}>
      <div className={octoBlock}>
        <span className={strokeText}>404</span>
        <img src="img/octo404.webp" />
        <span className={strokeText}>404</span>
      </div>
      <span>
        Initiate self-destruct sequence and return home to escape OCTOCORP!
      </span>
      <a href="/">
        <Button type="primary">Self destruct and leave</Button>
      </a>

      <div className={bgGradients} />
    </div>
  )
}
