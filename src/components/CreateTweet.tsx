import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreateTweetForm from 'components/CreateTweetForm'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'
import ProcessingPostsStore from 'stores/ProcessingPostsStore'
import TweetProcessing from 'components/TweetProcessing'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { postsStatuses } = useSnapshot(PostStatusStore)
  const { processingPostIds } = useSnapshot(ProcessingPostsStore)

  const accountProcessingTweetIds = account && processingPostIds[account]
  const currentTweetsStatuses = { ...postsStatuses }
  const currentTweets = accountProcessingTweetIds
    ? accountProcessingTweetIds.map(
        (tweetId) =>
          currentTweetsStatuses[tweetId] || {
            tweetId,
            status: PostStatus.pending,
          }
      )
    : []

  const pendingTweets = currentTweets.filter(
    (tweet) => tweet.status === PostStatus.pending
  )

  const lastPublishedTweet = currentTweets.find(
    (tweet) => tweet.status === PostStatus.published
  )

  return (
    <div className={margin('mt-6', 'mb-16')}>
      <div className={space('space-y-6', 'md:space-y-12')}>
        {pendingTweets.length > 0 ? (
          <TweetProcessing
            tweet={pendingTweets[0]}
            title={
              pendingTweets.length > 1
                ? 'Your tweets are processing'
                : 'Your tweet is processing'
            }
          />
        ) : (
          lastPublishedTweet && (
            <TweetProcessing
              tweet={lastPublishedTweet}
              title="Tweet successful"
            />
          )
        )}
        <CreateTweetForm />
      </div>
    </div>
  )
}
