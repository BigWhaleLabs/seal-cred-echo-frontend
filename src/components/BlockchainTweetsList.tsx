import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainTweet from 'components/BlockchainTweet'
import TwitterLoading from 'components/TwitterLoading'
import TwitterStore from 'stores/TwitterStore'
import flasingTweet from 'helpers/flasingTweet'
import useScrollToAnchor from 'helpers/useScrollToAnchor'

function BlockchainTweetsListSuspended() {
  const { blockchainTweets = [] } = useSnapshot(TwitterStore)
  useScrollToAnchor(0, true, flasingTweet)

  return (
    <>
      {blockchainTweets.map(
        ({ id, tweet, derivativeAddress, sender, timestamp }) => (
          <BlockchainTweet
            key={id}
            id={id}
            tweet={tweet}
            derivativeAddress={derivativeAddress}
            sender={sender}
            timestamp={timestamp}
          />
        )
      )}
    </>
  )
}

export default function () {
  return (
    <Suspense
      fallback={<TwitterLoading text="Fetching blockchain tweets..." />}
    >
      <BlockchainTweetsListSuspended />
    </Suspense>
  )
}
