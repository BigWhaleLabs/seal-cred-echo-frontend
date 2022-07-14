import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AnonymousAvatar from 'icons/AnonymousAvatar'
import Button from 'components/Button'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const connectBlockWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-8')
)

const headerTextWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-4')
)

export default function () {
  const { account, walletLoading } = useSnapshot(walletStore)
  console.log(account)
  return !account ? (
    <div className={connectBlockWrapper}>
      <div className={headerTextWrapper}>
        <AnonymousAvatar />
        <AccentText color="text-white" header bold>
          Create your anonymous tweet
        </AccentText>
        <AccentText color="text-white" small>
          We verify your email, you post with 100% anonymity
        </AccentText>
      </div>

      <AccentText color="text-white" bold>
        Connect your wallet to start
      </AccentText>
      <Button
        type="primary"
        loading={walletLoading}
        onClick={async () => {
          await walletStore.connect(true)
        }}
      >
        <span>Connect wallet</span>
      </Button>
    </div>
  ) : (
    <div></div>
  )
}
