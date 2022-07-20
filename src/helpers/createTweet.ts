import { SealCredTwitter__factory } from '@big-whale-labs/seal-cred-twitter-contract'
import { Web3Provider } from '@ethersproject/providers'
import TweetStructure from 'models/TweetStructure'
import TwitterStore from 'stores/TwitterStore'
import env from 'helpers/env'

export default async function (
  { tweet, domain }: TweetStructure,
  provider: Web3Provider
) {
  const ledger = SealCredTwitter__factory.connect(
    env.VITE_SC_TWITTER_LEDGER_CONTRACT_ADDRESS,
    provider.getSigner(0)
  )

  const tx = await ledger.saveTweet(tweet, domain)
  TwitterStore.tweetState = 'pending'
  return tx.wait()
}
