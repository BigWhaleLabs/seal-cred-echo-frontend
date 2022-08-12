import {
  BodyText,
  LinkText,
  PostText,
  StatusText,
  UnderlineTextButton,
} from 'components/Text'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractTitle from 'components/posts/ContractTitle'
import Delimiter from 'components/Delimiter'
import ENSAddress from 'components/ENSAddress'
import PostTime from 'components/posts/PostTime'
import Status from 'components/posts/Status'
import TwitterLink from 'components/posts/TwitterLink'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import walletStore from 'stores/WalletStore'

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
  const { account } = useSnapshot(walletStore)
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
  post: { id, post, derivativeAddress, sender, timestamp },
  onSelectAddress,
}: {
  post: PostStructOutput
  onSelectAddress: (address: string) => void
}) {
  return (
    <Card key={id}>
      <div className={container}>
        <div className={postHeader}>
          <Status id={id} />
          <PostTime timestamp={timestamp} />
        </div>
        <PostText>{post}</PostText>
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
                onClick={() => onSelectAddress(derivativeAddress)}
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
            <TwitterLink id={id} />
          </span>
        </BodyText>
      </div>
    </Card>
  )
}
