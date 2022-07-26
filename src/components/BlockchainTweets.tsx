import { BodyText, LinkText, StatusText, TweetText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import EnsAddress from 'components/EnsAddress'
import TweetChips from 'components/TweetChips'
import TweetStatus from 'models/TweetStatus'
import TweetTime from 'components/TweetTime'
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
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import tweetStatusStore from 'stores/TweetStatusStore'
import useScrollToAnchor from 'helpers/useScrollToAnchor'
import walletStore from 'stores/WalletStore'

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

function Sender({ sender }: { sender: string }) {
  const { account } = useSnapshot(walletStore)
  return (
    <LinkText extraSmall title={sender} url={getEtherscanAddressUrl(sender)}>
      {sender === account ? (
        'you'
      ) : (
        <EnsAddress address={sender} truncateSize={13} />
      )}
    </LinkText>
  )
}

function Contract({ address }: { address: string }) {
  return (
    <LinkText extraSmall title={address} url={getEtherscanAddressUrl(address)}>
      <ContractName clearType truncate address={address} />
    </LinkText>
  )
}

function Delimiter() {
  return (
    <div className={bottomSeparator}>
      <StatusText>|</StatusText>
    </div>
  )
}

function Status({ id }: { id: number }) {
  const { tweetsStatuses } = useSnapshot(tweetStatusStore)
  const tweet = tweetsStatuses[id]

  if (tweet?.status !== TweetStatus.published) return null

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredWork/status/${tweet.statusId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}

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
                <TweetTime timestamp={timestamp} />
              </div>
              <TweetText>{tweet}</TweetText>
              <BodyText primary>
                <span className={tweetBottom}>
                  <StatusText>Posted by: </StatusText>
                  <Sender sender={sender} />
                  <Delimiter />
                  <Contract address={derivativeAddress} />
                  <Delimiter />
                  <LinkText
                    extraSmall
                    title={derivativeAddress}
                    url={getEtherscanAddressUrl(derivativeAddress)}
                  >
                    Etherscan
                  </LinkText>
                  <Status id={id} />
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
