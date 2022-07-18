import { ContractTransaction, Overrides } from 'ethers'
import { PromiseOrValue } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/common'
import { Web3Provider } from '@ethersproject/providers'
import TweetStructure from 'models/TweetStructure'

interface SimpleLedger {
  saveTweet(
    tweet: string,
    domain: string,
    overrides?: Overrides & {
      from?: PromiseOrValue<string>
    }
  ): Promise<ContractTransaction>
}

export default abstract class BaseBuilder {
  ledger: SimpleLedger

  constructor(provider: Web3Provider, address: string) {
    this.ledger = this.createLedger(provider, address)
  }

  abstract createLedger(provider: Web3Provider, address: string): SimpleLedger

  async saveTweet({ tweet, domain }: TweetStructure) {
    if (!tweet) throw new Error('Invalid tweet')
    if (!domain) throw new Error('Invalid domain')

    const tx = await this.ledger.saveTweet(tweet, domain)
    return tx.wait()
  }
}
