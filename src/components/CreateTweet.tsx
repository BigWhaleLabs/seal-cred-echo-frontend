import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreateTweetForm from 'components/CreateTweetForm'
import TweetProcessing from 'components/TweetProcessing'
import TweetStatusStore from 'stores/TweetStatusStore'

export default function () {
  const { currentUserTweet } = useSnapshot(TweetStatusStore)

  return (
    <div className={margin('mt-6', 'mb-16')}>
      {currentUserTweet?.status === 'pending' ? (
        <TweetProcessing loading title="Your tweet is processing" />
      ) : (
        <div className={space('space-y-6', 'md:space-y-12')}>
          {currentUserTweet?.status === 'approved' && (
            <TweetProcessing title="Tweet successful" />
          )}
          <CreateTweetForm />
        </div>
      )}
    </div>
  )
}
