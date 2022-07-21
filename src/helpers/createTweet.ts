import { SealCredTwitter__factory } from '@big-whale-labs/seal-cred-twitter-contract'
import { Web3Provider } from '@ethersproject/providers'
import TweetStructure from 'models/TweetStructure'
import env from 'helpers/env'

export default async function (
  { tweet, domain }: TweetStructure,
  provider: Web3Provider
) {
  if (!tweet) throw new Error('Invalid tweet')
  if (!domain) throw new Error('Invalid domain')

  const ledger = SealCredTwitter__factory.connect(
    env.VITE_SC_TWITTER_LEDGER_CONTRACT_ADDRESS,
    provider.getSigner(0)
  )

  const tx = await ledger.saveTweet(tweet, domain)
  return tx.wait()
}
