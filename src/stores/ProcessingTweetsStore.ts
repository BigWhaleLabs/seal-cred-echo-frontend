import { TweetIdAndStatus } from 'models/TweetModel'
import { getTweetsByIdsFromPoster } from 'helpers/getTweetsFromPoster'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import TweetStatus from 'models/TweetStatus'
import TweetStatusStore from 'stores/TweetStatusStore'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'

class ProcessingTweetsStore {
  processingTweetIds: { [account: string]: number[] | undefined } = {}

  async fetchProcessingTweets() {
    if (WalletStore.account) {
      const tweetsInBlockchain = await TwitterStore.blockchainTweets
      const records = tweetsInBlockchain
        .filter(
          (record) =>
            record.sender === WalletStore.account &&
            TweetStatusStore.getTweetStatus(record.id) === TweetStatus.pending
        )
        .map((record) => record.id)
      this.processingTweetIds[WalletStore.account] = records
    }
  }

  async updateStatus() {
    const account = WalletStore.account
    if (!account) return
    const tweets = this.processingTweetIds[account]
    if (!tweets?.length) return
    const result = await getTweetsByIdsFromPoster(tweets)
    if (result) {
      const tweetsStatuses = {} as TweetIdAndStatus
      for (const tweet of result) {
        tweetsStatuses[tweet.tweetId] = tweet
      }
      TweetStatusStore.tweetsStatuses = {
        ...TweetStatusStore.tweetsStatuses,
        ...tweetsStatuses,
      }
    }
  }
}

const processingTweetsStore = proxy(new ProcessingTweetsStore())

subscribeKey(WalletStore, 'account', () => {
  void processingTweetsStore.fetchProcessingTweets()
})

setInterval(() => {
  void processingTweetsStore.updateStatus()
}, 1000) // poll tweets list every 10 seconds

export default processingTweetsStore
