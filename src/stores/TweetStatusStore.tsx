import { TweetIdAndStatus } from 'models/TweetModel'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'
import getTweetsFromPoster from 'helpers/getTweetsFromPoster'

class TweetStatusStore extends PersistableStore {
  tweetsStatuses: TweetIdAndStatus = {}
  processingTweets: { [account: string]: number[] | undefined } = {}

  replacer = (key: string, value: unknown) => {
    const disallowList = ['processingTweets']
    return disallowList.includes(key) ? undefined : value
  }

  async initFetchTweetList() {
    this.tweetsStatuses = await getTweetsFromPoster()

    if (WalletStore.account) {
      const tweetsInBlockchain = await TwitterStore.blockchainTweets
      const records = tweetsInBlockchain
        .filter(
          (record) =>
            record.sender === WalletStore.account &&
            this.getTweetStatus(record.id) === TweetStatus.pending
        )
        .map((record) => record.id)
      this.processingTweets[WalletStore.account] = records
    }
  }

  async fetchTweetList() {
    this.tweetsStatuses = await getTweetsFromPoster()
  }

  getTweetStatus(id: number) {
    return this.tweetsStatuses[id] || TweetStatus.pending
  }

  get currentUserTweets() {
    const account = WalletStore.account
    if (!account) return []
    const tweets = this.processingTweets[account]
    if (!tweets) return []
    return tweets.map((id) => ({
      tweetId: id,
      status: this.getTweetStatus(id),
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

export const tweetStatusStore = proxy(new TweetStatusStore()).makePersistent(
  true
)

void tweetStatusStore.initFetchTweetList()

setInterval(() => {
  void tweetStatusStore.fetchTweetList()
}, 10000) // poll tweets list every 10 seconds

export default tweetStatusStore
