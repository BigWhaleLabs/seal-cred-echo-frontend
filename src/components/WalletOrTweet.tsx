// import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
// import CreatePost from 'components/CreatePost'
// import WalletStore from 'stores/WalletStore'

export default function () {
  // const { account } = useSnapshot(WalletStore)

  // if (account) return <CreatePost />

  return <ConnectWalletBlock />
}
