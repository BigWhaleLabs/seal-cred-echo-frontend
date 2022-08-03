import { LargeText, LinkText, LoadingText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import { PostStatusModel } from 'models/PostStatusModel'
import { scrollToHashElement } from 'helpers/useScrollToAnchor'
import Arrow from 'icons/Arrow'
import Loading from 'components/Loading'
import PostStatus from 'models/PostStatus'
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
    padding('py-6', 'px-9'),
    borderRadius('rounded-2xl'),
    space(loading ? 'space-y-6' : 'space-y-2')
  )
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
  post,
}: {
  post: PostStatusModel
  title: string
}) {
  const loading = post.status === PostStatus.pending
  const redirectTo =
    post.status === PostStatus.published
      ? `https://twitter.com/SealCredEcho/status/${post.statusId}`
      : `/previous-tweets/blockchain#blockchainTweetId=${post.tweetId}`

  return (
    <div className={container(loading)}>
      <LargeText>{title}</LargeText>
      {loading && (
        <div className={margin('!mt-4')} style={{ maxWidth: '28rem' }}>
          <LoadingText>
            This may take a few minutes or up to 24 hours to post to Twitter.
            However, you can always view{' '}
            <NavLink
              onClick={() => scrollToHashElement()}
              to={redirectTo}
              className={viewBlockchainLink}
            >
              your Tweet
            </NavLink>{' '}
            here under ‘View all on Blockchain’.
          </LoadingText>
        </div>
      )}
      {loading && <Loading />}
      <LinkText
        small
        url={redirectTo}
        title={loading ? 'Tweets on blockchain' : '@SealCredEcho Twitter'}
        gradientFrom="from-secondary"
        gradientTo="to-accent"
      >
        <LinkInnerContainer />
      </LinkText>
    </div>
  )
}
