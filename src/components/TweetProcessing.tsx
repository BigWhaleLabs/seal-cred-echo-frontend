import { LargeText, LinkText, LoadingText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import { TweetModel } from 'models/TweetModel'
import { scrollToHashElement } from 'helpers/useScrollToAnchor'
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
  textColor,
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
    space(loading ? 'space-y-6' : 'space-y-2')
  )
const loadingText = classnames(margin('!mt-4'), padding('px-16'))
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

const viewBlockchainLink = textColor('text-primary')

export default function ({
  title,
  loading,
  tweet,
}: {
  tweet: TweetModel
  title: string
  loading?: boolean
}) {
  const redirectTo = loading
    ? `/previous-tweets/blockchain#blockchainTweetId=${tweet.tweetId}`
    : 'https://twitter.com/SealCredWork'

  return (
    <div className={container(loading)}>
      <LargeText>{title}</LargeText>
      {loading && (
        <div className={loadingText}>
          <LoadingText>
            It is currently posted to the raw data (
            <NavLink
              onClick={() => scrollToHashElement()}
              to={redirectTo}
              className={viewBlockchainLink}
            >
              view it here
            </NavLink>
            ). But it may take as long as 24 before it posts to Twitter due to
            moderation.
          </LoadingText>
        </div>
      )}
      {loading && <Loading />}
      <LinkText
        small
        url={redirectTo}
        title={loading ? 'Tweets on blockchain' : '@SealCredWork Twitter'}
        gradientFrom="from-secondary"
        gradientTo="to-accent"
      >
        <LinkInnerContainer />
      </LinkText>
    </div>
  )
}
