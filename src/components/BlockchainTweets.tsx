import { BodyText, LinkText, StatusText, TweetText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import TweetChips from 'components/TweetChips'
import TwitterLoading from 'components/TwitterLoading'
import TwitterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
  width,
} from 'classnames/tailwind'
import formatDate from 'helpers/formatDate'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useScrollToAnchor from 'helpers/useScrollToAnchor'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4')
)
const tweetHeader = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center')
)
const tweetBottom = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-start', 'sm:items-baseline'),
  space('space-y-1', 'sm:space-x-2', 'sm:space-y-0')
)
const bottomSeparator = classnames(
  width('w-fit'),
  display('hidden', 'sm:block')
)

function BlockchainTweetsSuspended() {
  const { blockchainTweets = [] } = useSnapshot(TwitterStore)
  useScrollToAnchor()

  return (
    <>
      {blockchainTweets.map(
        ({ id, tweet, derivativeAddress, sender, timestamp }) => (
          <Card key={id}>
            <div className={container}>
              <div className={tweetHeader}>
                <TweetChips id={id} />
                <StatusText textRight>{formatDate(timestamp)}</StatusText>
              </div>
              <TweetText>{tweet}</TweetText>
              <BodyText primary>
                <span className={tweetBottom}>
                  <StatusText>Posted by: </StatusText>
                  <LinkText
                    extraSmall
                    title={sender}
                    url={getEtherscanAddressUrl(sender)}
                  >
                    {!!sender && truncateMiddleIfNeeded(sender, 13)}
                  </LinkText>
                  <div className={bottomSeparator}>
                    <StatusText>|</StatusText>
                  </div>
                  <LinkText
                    extraSmall
                    title={derivativeAddress}
                    url={getEtherscanAddressUrl(derivativeAddress)}
                  >
                    Etherscan
                  </LinkText>
                </span>
              </BodyText>
            </div>
          </Card>
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
      <BlockchainTweetsSuspended />
    </Suspense>
  )
}
