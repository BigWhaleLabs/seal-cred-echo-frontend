import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import CreateTweetWrapper from 'components/CreateTweetWrapper'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)

  if (account) return <CreateTweetWrapper />

  return <ConnectWalletBlock />
}
