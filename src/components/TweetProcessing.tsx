import { LargeText, LoadingText } from 'components/Text'
import Button from 'components/Button'
import Loading from 'components/Loading'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  margin,
  padding,
  space,
} from 'classnames/tailwind'

const container = (loading?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    backgroundColor('bg-primary-background'),
    padding('py-6', 'px-2'),
    borderRadius('rounded-2xl'),
    margin('mx-4', 'mt-6', 'mb-12'),
    space(loading ? 'space-y-6' : 'space-y-2')
  )
const loadingText = classnames(margin('!mt-4'))

export default function ({
  title,
  loading,
}: {
  title: string
  loading?: boolean
}) {
  return (
    <div className={container(loading)}>
      <LargeText>{title}</LargeText>
      {loading && (
        <div className={loadingText}>
          <LoadingText>This may take a few minutes.</LoadingText>
        </div>
      )}
      {loading && <Loading />}
      <Button small gradientFont withArrow>
        View Twitter page
      </Button>
    </div>
  )
}
