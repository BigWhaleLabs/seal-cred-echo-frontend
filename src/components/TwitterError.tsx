import { LoadingText } from 'components/Text'
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

export default function ({ text }: { text: string }) {
  return (
    <div className={loadingClass}>
      <LoadingText>{text}</LoadingText>
    </div>
  )
}
