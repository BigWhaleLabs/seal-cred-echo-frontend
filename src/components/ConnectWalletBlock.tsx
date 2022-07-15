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
import walletStore from 'stores/WalletStore'

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
  const { walletLoading } = useSnapshot(WalletStore)

  return (
    <div className={connectBlockWrapper}>
      <div className={headerTextWrapper}>
        <AnonymousAvatar />
        <StaticHeaderText bold>Create your anonymous tweet</StaticHeaderText>
        <AccentText color="text-white" small>
          We verify your email, you post with 100% anonymity
        </AccentText>
      </div>

      <StaticHeaderText subheading bold>
        Connect your wallet to start
      </StaticHeaderText>
      <Button
        type="primary"
        loading={walletLoading}
        onClick={async () => {
          await walletStore.connect(true)
        }}
      >
        Connect wallet
      </Button>
    </div>
  )
}
