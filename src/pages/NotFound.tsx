import { useEffect } from 'preact/hooks'
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
  gap,
  justifyContent,
  margin,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  textAlign('text-center'),
  gap('gap-y-4')
)
const octoBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'xl:flex-row'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  gap('gap-x-40', 'gap-y-14')
)
const textStyles = classnames(width('w-fit', 'xl:w-max'), margin('mt-7'))
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
const imageStyles = width('w-80', 'xl:w-full')
const displayFromMd = display('hidden', 'xl:block')

export default function () {
  document.title = '🐙 OCTOCORP'

  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute('bg-theme', '404')

    return () => {
      document.getElementsByTagName('html')[0].setAttribute('bg-theme', '')
    }
  })

  return (
    <div className={container}>
      <div className={octoBlock}>
        <div className={displayFromMd}>
          <span className={strokeText}>404</span>
        </div>
        <img className={imageStyles} src="img/octo404.webp" />
        <div className={strokeText}>404</div>
      </div>
      <span className={textStyles}>
        Initiate self-destruct sequence and return home to escape OCTOCORP!
      </span>
      <a href="/">
        <Button type="primary">Self destruct and leave</Button>
      </a>
    </div>
  )
}
