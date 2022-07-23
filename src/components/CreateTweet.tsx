import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreateTweetForm from 'components/CreateTweetForm'
import ProcessingTweetsStore from 'stores/ProcessingTweetsStore'
import TweetProcessing from 'components/TweetProcessing'
import TweetStatus from 'models/TweetStatus'
import WalletStore from 'stores/WalletStore'
import tweetStatusStore from 'stores/TweetStatusStore'

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { tweetsStatuses } = useSnapshot(tweetStatusStore)
  const { processingTweetIds } = useSnapshot(ProcessingTweetsStore)

  const accountProcessingTweetIds = account && processingTweetIds[account]
  const currentTweetsStatuses = { ...tweetsStatuses }
  const currentTweets = accountProcessingTweetIds
    ? accountProcessingTweetIds.map((id) => currentTweetsStatuses[id])
    : []

  const pendingTweets = currentTweets.filter(
    (tweet) => !tweet.status || tweet.status === TweetStatus.pending
  )

  const lastApprovedTweet = currentTweets.find(
    (tweet) => tweet.status === TweetStatus.approved
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
          lastApprovedTweet && (
            <TweetProcessing
              tweet={lastApprovedTweet}
              title="Tweet successful"
            />
          )
        )}
        <CreateTweetForm />
      </div>
    </div>
  )
}
