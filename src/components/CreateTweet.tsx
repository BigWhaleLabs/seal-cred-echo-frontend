import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreateTweetForm from 'components/CreateTweetForm'
import TweetProcessing from 'components/TweetProcessing'
import TweetStatusStore from 'stores/TweetStatusStore'

export default function () {
  const { pendingTweets, lastApprovedTweet } = useSnapshot(TweetStatusStore)

  return (
    <div className={margin('mt-6', 'mb-16')}>
      <div className={space('space-y-6', 'md:space-y-12')}>
        {pendingTweets.length > 0 ? (
          <TweetProcessing
            loading
            title={
              pendingTweets.length > 1
                ? 'Your tweets are processing'
                : 'Your tweet is processing'
            }
          />
        ) : (
          lastApprovedTweet?.status === 'approved' && (
            <TweetProcessing title="Tweet successful" />
          )
        )}
        <CreateTweetForm />
      </div>
    </div>
  )
}
