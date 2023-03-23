import {
  BodyText,
  LinkText,
  PostText,
  StatusText,
  UnderlineTextButton,
} from 'components/Text'
import { Suspense } from 'preact/compat'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useInView } from 'react-intersection-observer'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractTitle from 'components/BlockchainList/ContractTitle'
import Delimiter from 'components/Delimiter'
import PostStore from 'stores/PostStore'
import PostTime from 'components/BlockchainList/PostTime'
import Status from 'components/BlockchainList/Status'
import TwitterLink from 'components/BlockchainList/TwitterLink'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4')
)
const postHeader = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  justifyContent('justify-between'),
  alignItems('items-end', 'xs:items-center'),
  gap('gap-y-2', 'xs:gap-y-0')
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
      {sender === account ? 'you' : truncateMiddleIfNeeded(sender, 13)}
    </LinkText>
  )
}

export default function ({
  blockchainId,
  derivativeAddress,
  postType,
  sender,
  text,
  timestamp,
}: {
  blockchainId: number
  timestamp: number
  text: string
  sender: string
  derivativeAddress: string
  postType: string
}) {
  const { inView, ref } = useInView()

  return (
    <div
      data-anchor={`#store=${postType}&id=${blockchainId}`}
      ref={ref}
      style={{ height: inView ? 'fit-content' : '150px' }}
    >
      {inView && (
        <Card>
          <div className={container}>
            <div className={postHeader}>
              <Status blockchainId={blockchainId} />
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
                  <ContractTitle
                    address={derivativeAddress}
                    onClick={() =>
                      (PostStore.selectedToken = derivativeAddress)
                    }
                  />
                </Suspense>
                <Delimiter />
                <LinkText
                  extraSmall
                  title={derivativeAddress}
                  url={getEtherscanAddressUrl(derivativeAddress)}
                >
                  Etherscan
                </LinkText>
                <TwitterLink blockchainId={blockchainId} />
              </span>
            </BodyText>
          </div>
        </Card>
      )}
    </div>
  )
}
