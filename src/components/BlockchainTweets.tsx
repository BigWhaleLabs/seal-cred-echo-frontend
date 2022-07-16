import { LinkText, StatusText, TweetText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import TweetStatus from 'components/TweetStatus'
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

export default function () {
  const { blockchainTweets } = useSnapshot(TwitterStore)

  if (!blockchainTweets) return null

  return (
    <>
      {blockchainTweets.map(({ text, author, status, updatedAt }) => (
        <Card>
          <div className={container}>
            <div className={tweetHeader}>
              <TweetStatus status={status} text={status} />
              <StatusText>{updatedAt}</StatusText>
            </div>
            <TweetText>{text}</TweetText>
            <div className={tweetBottom}>
              <StatusText>Posted by: </StatusText>
              <LinkText
                small
                targetBlank
                title={author}
                url={getEtherscanAddressUrl(author)}
              >
                {truncateMiddleIfNeeded(author, 13)}
              </LinkText>
              <div className={bottomSeparator}>
                <StatusText>|</StatusText>
              </div>
              <LinkText
                small
                targetBlank
                title={author}
                url={getEtherscanAddressUrl(author)}
              >
                Etherscan
              </LinkText>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}
