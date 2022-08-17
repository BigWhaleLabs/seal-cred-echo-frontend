import {
  BodyText,
  LinkText,
  PostText,
  StatusText,
  UnderlineTextButton,
} from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractTitle from 'components/BlockchainList/ContractTitle'
import Delimiter from 'components/Delimiter'
import ENSAddress from 'components/ENSAddress'
import PostTime from 'components/BlockchainList/PostTime'
import Status from 'components/BlockchainList/Status'
import TwitterLink from 'components/BlockchainList/TwitterLink'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4')
)
const postHeader = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center')
)
const postBottom = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-start', 'sm:items-baseline'),
  space('space-y-1', 'sm:space-x-2', 'sm:space-y-0')
)

function Sender({ sender }: { sender: string }) {
  const { account } = useSnapshot(WalletStore)
  return (
    <LinkText extraSmall title={sender} url={getEtherscanAddressUrl(sender)}>
      {sender === account ? (
        'you'
      ) : (
        <ENSAddress address={sender} truncateSize={13} />
      )}
    </LinkText>
  )
}

export default function ({
  id,
  timestamp,
  text,
  sender,
  derivativeAddress,
}: {
  id: number
  timestamp: number
  text: string
  sender: string
  derivativeAddress: string
}) {
  return (
    <Card>
      <div className={container}>
        <div className={postHeader}>
          <Status id={id} />
          <PostTime timestamp={timestamp} />
        </div>
        <PostText>{text}</PostText>
        <BodyText primary>
          <span className={postBottom}>
            <StatusText>Posted by: </StatusText>
            <Sender sender={sender} />
            <Delimiter />
            <Suspense
              fallback={
                <UnderlineTextButton>
                  {truncateMiddleIfNeeded(derivativeAddress, 23)}
                </UnderlineTextButton>
              }
            >
              <ContractTitle address={derivativeAddress} />
            </Suspense>
            <Delimiter />
            <LinkText
              extraSmall
              title={derivativeAddress}
              url={getEtherscanAddressUrl(derivativeAddress)}
            >
              Etherscan
            </LinkText>
            <TwitterLink id={id} />
          </span>
        </BodyText>
      </div>
    </Card>
  )
}
