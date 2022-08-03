import {
  BodyText,
  LinkText,
  PostText,
  StatusText,
  UnderlineTextButton,
} from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'
import Delimiter from 'components/Delimiter'
import EnsAddress from 'components/EnsAddress'
import PostChips from 'components/PostChips'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'
import PostTime from 'components/PostTime'
import SealCredStore from 'stores/SealCredStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
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
        <EnsAddress address={sender} truncateSize={13} />
      )}
    </LinkText>
  )
}

export function PostContract({
  address,
  onClick,
}: {
  address: string
  onClick?: () => void
}) {
  const { externalERC721derivativeContracts } = useSnapshot(SealCredStore)

  if (externalERC721derivativeContracts.includes(address)) {
    return (
      <UnderlineTextButton onClick={onClick}>
        <ContractSymbol address={address} />
      </UnderlineTextButton>
    )
  }

  return (
    <UnderlineTextButton onClick={onClick}>
      <ContractName clearType truncate address={address} />
    </UnderlineTextButton>
  )
}

function Status({ id }: { id: number }) {
  const { postsStatuses } = useSnapshot(PostStatusStore)
  const post = postsStatuses[id]

  if (post?.status !== PostStatus.published) return null

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredWork/status/${post.statusId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}

export default function ({
  id,
  post,
  derivativeAddress,
  sender,
  timestamp,
  onSelectAddress,
}: {
  id: number
  post: string
  derivativeAddress: string
  sender: string
  timestamp: number
  onSelectAddress: (address: string) => void
}) {
  return (
    <Card key={id}>
      <div className={container}>
        <div className={postHeader}>
          <PostChips id={id} />
          <PostTime timestamp={timestamp} />
        </div>
        <PostText>{post}</PostText>
        <BodyText primary>
          <span className={postBottom}>
            <StatusText>Posted by: </StatusText>
            <Sender sender={sender} />
            <Delimiter />

            <PostContract
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
