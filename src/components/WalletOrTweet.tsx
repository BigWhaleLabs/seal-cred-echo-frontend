import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import CreateTweet from 'components/CreateTweet'
import TweetProcessing from 'components/TweetProcessing'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)

  if (account)
    return (
      <Suspense
        fallback={
          <TweetProcessing hideLink loading title="Fetching statuses" />
        }
      >
        <CreateTweet />
      </Suspense>
    )

  return <ConnectWalletBlock />
}
