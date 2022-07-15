import { BodyText, LinkText, StatusText, TweetText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AgeWarning from 'components/AgeWarning'
import AppStore from 'stores/AppStore'
import Card from 'components/Card'
import HintCard from 'components/HintCard'
import PreviousTweetsLayout from 'components/PrevTweetsLayout'
import TweetStatus from 'components/TweetStatus'
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
  const { adultAccepted } = useSnapshot(AppStore)
  const owner = '0x3d05B1a1837f7F4E3E5C7ca0A28eb751BaAF125C'

  return (
    <PreviousTweetsLayout back>
      {!adultAccepted && <AgeWarning />}
      <HintCard>
        <BodyText primary>
          This is unfiltered user-generated content. We did not play a part in
          its creation beyond providing a space to display it.
        </BodyText>
      </HintCard>
      <Card>
        <div className={container}>
          <div className={tweetHeader}>
            <TweetStatus status="pending" text="Pending review..." />
            <StatusText>4m</StatusText>
          </div>
          <TweetText>
            I’ve lost over 50% of value on mine. I'm hopeful that the market
            will turn around, but what do you all think?
          </TweetText>
          <div className={tweetBottom}>
            <StatusText>Posted by: </StatusText>
            <LinkText
              small
              targetBlank
              title={owner}
              url={getEtherscanAddressUrl(owner)}
            >
              {truncateMiddleIfNeeded(owner, 13)}
            </LinkText>
            <div className={bottomSeparator}>
              <StatusText>|</StatusText>
            </div>
            <LinkText
              small
              targetBlank
              title={owner}
              url={getEtherscanAddressUrl(owner)}
            >
              Etherscan
            </LinkText>
          </div>
        </div>
      </Card>
      <Card>
        <div className={container}>
          <div className={tweetHeader}>
            <TweetStatus status="error" text="Rejected" />
            <StatusText>4m</StatusText>
          </div>
          <TweetText>
            I’ve lost over 50% of value on mine. I'm hopeful that the market
            will turn around, but what do you all think?
          </TweetText>
          <div className={tweetBottom}>
            <StatusText>Posted by: </StatusText>
            <LinkText
              small
              targetBlank
              title={owner}
              url={getEtherscanAddressUrl(owner)}
            >
              {truncateMiddleIfNeeded(owner, 13)}
            </LinkText>
            <div className={bottomSeparator}>
              <StatusText>|</StatusText>
            </div>
            <LinkText
              small
              targetBlank
              title={owner}
              url={getEtherscanAddressUrl(owner)}
            >
              Etherscan
            </LinkText>
          </div>
        </div>
      </Card>
      <Card>
        <div className={container}>
          <div className={tweetHeader}>
            <TweetStatus status="posted" text="Posted to Twitter" />
            <StatusText>4m</StatusText>
          </div>
          <TweetText>
            I’ve lost over 50% of value on mine. I'm hopeful that the market
            will turn around, but what do you all think?
          </TweetText>
          <div className={tweetBottom}>
            <StatusText>Posted by: </StatusText>
            <LinkText
              small
              targetBlank
              title={owner}
              url={getEtherscanAddressUrl(owner)}
            >
              {truncateMiddleIfNeeded(owner, 13)}
            </LinkText>
            <div className={bottomSeparator}>
              <StatusText>|</StatusText>
            </div>
            <LinkText
              small
              targetBlank
              title={owner}
              url={getEtherscanAddressUrl(owner)}
            >
              Etherscan
            </LinkText>
          </div>
        </div>
      </Card>
    </PreviousTweetsLayout>
  )
}
