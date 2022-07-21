import { TweetIdAndStatus } from 'models/TweetModel'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'
import getTweetsFromPoster from 'helpers/getTweetsFromPoster'

class TweetStatusStore extends PersistableStore {
  tweetsStatuses: TweetIdAndStatus = {}
  processingTweets: { [account: string]: number | undefined } = {}

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

  get currentUserTweet() {
    const account = WalletStore.account
    if (!account) return
    const tweetId = this.processingTweets[account]
    if (!tweetId) return
    const status = this.getTweetStatus(tweetId)
    return { tweetId, status }
  }
}

export const tweetStatusStore = proxy(new TweetStatusStore()).makePersistent()

setInterval(() => {
  void tweetStatusStore.fetchTweetList()
}, 10000) // poll tweets list every 10 seconds

export default tweetStatusStore
