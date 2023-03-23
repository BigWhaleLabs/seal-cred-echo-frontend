import { AccentText, StaticHeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AnonymousAvatar from 'icons/AnonymousAvatar'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  space,
  textAlign,
} from 'classnames/tailwind'

const connectBlockWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-6'),
  textAlign('text-center'),
  margin('mb-12')
)

const headerTextWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-1')
)

export default function () {
  const { needNetworkChange, walletLoading } = useSnapshot(WalletStore)

  return (
    <div className={connectBlockWrapper}>
      <div className={headerTextWrapper}>
        <AnonymousAvatar />
        <StaticHeaderText bold>Create your anonymous tweet</StaticHeaderText>
        <AccentText small color="text-white">
          Tweet anonymously using your ZK badges.
        </AccentText>
      </div>

      <StaticHeaderText bold subheading>
        Connect your wallet to start
      </StaticHeaderText>
      <Button
        loading={walletLoading}
        type="primary"
        onClick={async () => {
          await WalletStore.connect(true)
        }}
      >
        {needNetworkChange ? 'Change network' : 'Connect wallet'}
      </Button>
    </div>
  )
}
