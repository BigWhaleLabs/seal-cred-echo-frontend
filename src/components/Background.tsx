import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  height,
  inset,
  opacity,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'

const bgFit = classnames(
  position('absolute'),
  inset('top-0', 'left-0'),
  width('w-full'),
  height('h-full'),
  opacity('opacity-60'),
  zIndex('z-0')
)

export default function () {
  return (
    <img
      src={'/img/bg-shadows.svg'}
      className={classNamesToString(bgFit, 'bgCover')}
    />
  )
}
