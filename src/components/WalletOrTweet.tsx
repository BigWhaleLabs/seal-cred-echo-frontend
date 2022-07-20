import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import CreateTweet from 'components/CreateTweet'
import TweetProcessing from 'components/TweetProcessing'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { tweetState } = useSnapshot(TwitterStore)

  if (account)
    return (
      <>
        {tweetState === 'pending' && (
          <TweetProcessing loading title="Your tweet is processing" />
        )}
        {(!tweetState || tweetState === 'success') && (
          <div className={space('space-y-14')}>
            {tweetState === 'success' && (
              <TweetProcessing title="Tweet successful" />
            )}
            <CreateTweet />
          </div>
        )}
      </>
    )

  return <ConnectWalletBlock />
}
