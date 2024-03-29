import { LinkText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ContractTitle from 'components/BlockchainList/ContractTitle'
import Cross from 'icons/Cross'
import PostStore from 'stores/PostStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  cursor,
  display,
  flexDirection,
  gap,
  height,
  padding,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  gap('gap-x-2.5'),
  width('w-fit'),
  padding('px-4', 'py-2'),
  borderRadius('rounded-lg'),
  backgroundColor('bg-primary-background')
)
const closeButton = classnames(
  width('w-4'),
  height('h-4'),
  cursor('cursor-pointer')
)

export default function () {
  const { selectedToken } = useSnapshot(PostStore)

  if (!selectedToken) return null

  return (
    <div className={container}>
      <LinkText extraSmall url={getEtherscanAddressUrl(selectedToken)}>
        <ContractTitle address={selectedToken} />
      </LinkText>

      <div
        className={closeButton}
        onClick={() => (PostStore.selectedToken = undefined)}
      >
        <Cross />
      </div>
    </div>
  )
}
