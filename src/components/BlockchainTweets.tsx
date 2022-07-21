import { LinkText, StatusText, TweetText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import TweetChips from 'components/TweetChips'
import TweetStatusStore from 'stores/TweetStatusStore'
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
  alignItems('items-start', 'sm:items-center'),
  space('space-y-1', 'sm:space-x-1', 'sm:space-y-0')
)
const bottomSeparator = classnames(
  width('w-fit'),
  display('hidden', 'sm:block')
)

function BlockchainTweetsSuspended() {
  const { blockchainTweets = [] } = useSnapshot(TwitterStore)
  const { tweetsStatuses } = useSnapshot(TweetStatusStore)

  return (
    <>
      {blockchainTweets.map(
        ({ id, tweet, derivativeAddress, sender, timestamp }) => (
          <Card>
            <div className={container}>
              <div className={tweetHeader}>
                <TweetChips status={tweetsStatuses[id]} />
                <StatusText textRight>{formatDate(timestamp)}</StatusText>
              </div>
              <TweetText>{tweet}</TweetText>
              <div className={tweetBottom}>
                <StatusText>Posted by: </StatusText>
                <LinkText
                  extraSmall
                  targetBlank
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
                  targetBlank
                  title={derivativeAddress}
                  url={getEtherscanAddressUrl(derivativeAddress)}
                >
                  Etherscan
                </LinkText>
              </div>
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
