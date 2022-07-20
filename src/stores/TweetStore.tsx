import { TweetModel, TweetsSet } from 'models/TweetModel'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'
import getBlockchainTweets from 'helpers/getBlockchainTweets'
import getTweetsFromPoster from 'helpers/getTweetsFromPoster'

class TweetStore extends PersistableStore {
  currentTweet?: TweetModel
  tweets: TweetsSet = {}

  async fetchTweetList(force?: boolean) {
    if (!force && !this.currentTweet) return
    this.tweets = await getTweetsFromPoster()
    const tweetsInBlockchain = await getBlockchainTweets()
    TwitterStore.blockchainTweets = Promise.resolve(
      tweetsInBlockchain.map((tweet) => ({
        ...tweet,
        status: this.getTweetStatus(tweet.id),
      }))
    )
  }

  getTweetStatus(id: number) {
    return this.tweets[id] || TweetStatus.pending
  }
}

export const tweetStore = proxy(new TweetStore()).makePersistent()

subscribeKey(WalletStore, 'account', () => {
  void tweetStore.fetchTweetList(true)
})

setInterval(() => {
  void tweetStore.fetchTweetList()
}, 10000) // poll tweets list every 10 seconds

export default tweetStore
