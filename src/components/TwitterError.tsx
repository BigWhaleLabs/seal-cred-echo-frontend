import { LoadingText } from 'components/Text'
import Button from 'components/Button'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  padding,
  space,
  textAlign,
} from 'classnames/tailwind'

const loadingClass = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-4'),
  height('h-full'),
  padding('py-6'),
  textAlign('text-center')
)

export default function ({
  text,
  onRefresh,
}: {
  text: string
  onRefresh: () => void
}) {
  return (
    <div className={loadingClass}>
      <LoadingText>{text}</LoadingText>
      <Button small type="primary" onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  )
}
