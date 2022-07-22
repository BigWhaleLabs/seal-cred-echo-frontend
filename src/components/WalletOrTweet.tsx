import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import CreateTweet from 'components/CreateTweet'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)

  if (account) return <CreateTweet />

  return <ConnectWalletBlock />
}
