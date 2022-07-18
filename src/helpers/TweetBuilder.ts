import { SealCredTwitter__factory } from '@big-whale-labs/seal-cred-twitter-contract'
import { Web3Provider } from '@ethersproject/providers'
import BaseBuilder from 'helpers/BaseBuilder'
import TweetStructure from 'models/TweetStructure'
import env from 'helpers/env'

export default class TweetBuilder extends BaseBuilder {
  constructor(provider: Web3Provider) {
    super(provider, env.VITE_SC_TWITTER_LEDGER_CONTRACT_ADDRESS)
  }

  createLedger(provider: Web3Provider, address: string) {
    return SealCredTwitter__factory.connect(address, provider.getSigner(0))
  }

  create(tweetObject: TweetStructure) {
    return this.saveTweet(tweetObject)
  }
}
