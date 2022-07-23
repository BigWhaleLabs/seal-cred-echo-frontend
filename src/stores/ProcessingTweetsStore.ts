import { getTweetFromPoster } from 'helpers/getTweetsFromPoster'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import TweetStatus from 'models/TweetStatus'
import TweetStatusStore from 'stores/TweetStatusStore'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'

class ProcessingTweetsStore {
  processingTweets: { [account: string]: number[] | undefined } = {}

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
      this.processingTweets[WalletStore.account] = records
    }
  }

  async updateStatus() {
    const [tweet] = this.pendingTweets
    if (!tweet) return
    const result = await getTweetFromPoster(tweet.id)
    if (result) TweetStatusStore.tweetsStatuses[tweet.id] = result.status
  }

  get currentUserTweets() {
    const account = WalletStore.account
    if (!account) return []
    const tweets = this.processingTweets[account]
    if (!tweets) return []
    return tweets.map((id) => ({
      id: id,
      status: TweetStatusStore.getTweetStatus(id),
    }))
  }

  get lastApprovedTweet() {
    return this.currentUserTweets.find(
      ({ status }) => status === TweetStatus.approved
    )
  }

  get pendingTweets() {
    return this.currentUserTweets.filter(
      ({ status }) => status === TweetStatus.pending
    )
  }
}

const processingTweetsStore = proxy(new ProcessingTweetsStore())

subscribeKey(WalletStore, 'account', () => {
  void processingTweetsStore.fetchProcessingTweets()
})

setInterval(() => {
  void processingTweetsStore.updateStatus()
}, 10000) // poll tweets list every 10 seconds

export default processingTweetsStore
