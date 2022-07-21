import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import CreateTweet from 'components/CreateTweet'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)

  if (account)
    return (
      <Suspense fallback={null}>
        <CreateTweet />
      </Suspense>
    )

  return <ConnectWalletBlock />
}
