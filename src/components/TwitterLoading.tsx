import { LoadingText } from 'components/Text'
import Loading from 'components/Loading'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  margin,
  padding,
  space,
} from 'classnames/tailwind'

const loadingClass = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-8'),
  height('h-full'),
  padding('py-6')
)

export default function ({ text }: { text: string }) {
  return (
    <div className={loadingClass}>
      <LoadingText>{text}</LoadingText>
      <div className={margin('mx-auto')}>
        <Loading />
      </div>
    </div>
  )
}
