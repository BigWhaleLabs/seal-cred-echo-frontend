import {
  BodyText,
  LinkText,
  StatusText,
  TweetText,
  UnderlineTextButton,
} from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import Delimiter from 'components/Delimiter'
import EnsAddress from 'components/EnsAddress'
import TweetChips from 'components/TweetChips'
import TweetStatus from 'models/TweetStatus'
import TweetTime from 'components/TweetTime'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import tweetStatusStore from 'stores/TweetStatusStore'
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

function Contract({
  address,
  onClick,
}: {
  address: string
  onClick: () => void
}) {
  return (
    <UnderlineTextButton onClick={onClick}>
      <ContractName clearType truncate address={address} />
    </UnderlineTextButton>
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

export default function ({
  id,
  tweet,
  derivativeAddress,
  sender,
  timestamp,
  onSelectAddress,
}: {
  id: number
  tweet: string
  derivativeAddress: string
  sender: string
  timestamp: number
  onSelectAddress: (address: string) => void
}) {
  return (
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
            <Contract
              address={derivativeAddress}
              onClick={() => onSelectAddress(derivativeAddress)}
            />
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
}
