import { TweetIdAndStatus } from 'models/TweetModel'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'
import getTweetsFromPoster from 'helpers/getTweetsFromPoster'

class TweetStore extends PersistableStore {
  tweetsStatuses: TweetIdAndStatus = {}

  async fetchTweetList() {
    this.tweetsStatuses = await getTweetsFromPoster()
    const tweetsInBlockchain = await TwitterStore.blockchainTweets
    TwitterStore.blockchainTweets = Promise.resolve(
      tweetsInBlockchain.map((tweet) => ({
        ...tweet,
        status: this.getTweetStatus(tweet.id),
      }))
    )
  }

  getTweetStatus(id: number) {
    return this.tweetsStatuses[id] || TweetStatus.pending
  }
}

export const tweetStore = proxy(new TweetStore()).makePersistent()

subscribeKey(WalletStore, 'account', () => {
  void tweetStore.fetchTweetList()
})

setInterval(() => {
  void tweetStore.fetchTweetList()
}, 10000) // poll tweets list every 10 seconds

export default tweetStore
