import { Size, displayFrom } from 'helpers/visibilityClassnames'
import { StatusText } from 'components/Text'
import classnames, {
  TArg,
  alignItems,
  justifyContent,
  width,
} from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  alignItems('items-center'),
  justifyContent('justify-center')
)

export default function ({
  className,
  primary,
  showFrom = 'sm',
}: {
  primary?: boolean
  showFrom?: Size
  className?: TArg
}) {
  return (
    <div
      className={classnames(bottomSeparator, className, displayFrom(showFrom))}
    >
      <StatusText color={primary ? 'primary' : 'default'}>|</StatusText>
    </div>
  )
}
