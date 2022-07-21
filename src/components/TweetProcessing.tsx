import { LargeText, LinkText, LoadingText } from 'components/Text'
import Arrow from 'icons/Arrow'
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
  width,
} from 'classnames/tailwind'

const container = (loading?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    backgroundColor('bg-primary-background'),
    padding('py-6', 'px-2'),
    borderRadius('rounded-2xl'),
    margin('mt-6', 'mb-12'),
    space(loading ? 'space-y-6' : 'space-y-2')
  )
const loadingText = margin('!mt-4')
const linkInnerContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-2')
)

const LinkInnerContainer = () => {
  return (
    <div className={linkInnerContainer}>
      <span>View Twitter page</span>
      <div className={width('w-4')}>
        <Arrow horizontal />
      </div>
    </div>
  )
}

export default function ({
  title,
  loading,
}: {
  title: string
  loading?: boolean
}) {
  const redirectTo = loading
    ? '/previous-tweets/blockchain'
    : 'https://twitter.com/SealCredWork'

  return (
    <div className={container(loading)}>
      <LargeText>{title}</LargeText>
      {loading && (
        <div className={loadingText}>
          <LoadingText>This may take a few minutes.</LoadingText>
        </div>
      )}
      {loading && <Loading />}
      <LinkText
        small
        url={redirectTo}
        title={loading ? 'Tweets on blockchain' : '@SealCredWork Twitter'}
        targetBlank={!loading}
        gradientFrom="from-secondary"
        gradientTo="to-accent"
      >
        <LinkInnerContainer />
      </LinkText>
    </div>
  )
}
