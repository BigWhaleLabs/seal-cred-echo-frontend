import { TweetModel } from 'models/TweetModel'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'
import TwitterStore from 'stores/TwitterStore'
import WalletStore from 'stores/WalletStore'
import axios from 'axios'
import env from 'helpers/env'

class TweetStatusStore extends PersistableStore {
  processingTweets: { [account: string]: number[] | undefined } = {}

  replacer = (key: string, value: unknown) => {
    const disallowList = ['processingTweets']
    return disallowList.includes(key) ? undefined : value
  }

  async initFetchTweetList() {
    if (WalletStore.account) {
      const tweetsInBlockchain = await TwitterStore.blockchainTweets
      const records = tweetsInBlockchain
        .filter(
          async (record) =>
            record.sender === WalletStore.account &&
            (await this.getTweetStatus(record.id)) === TweetStatus.pending
        )
        .map((record) => record.id)
      this.processingTweets[WalletStore.account] = records
    }
  }

  async getTweetStatus(id: number) {
    const { data } = await axios.get<TweetModel>(
      `${env.VITE_TWITTER_POSTER_URL}/tweets/${id}`
    )
    return data.status || TweetStatus.pending
  }

  get currentUserTweets() {
    const account = WalletStore.account
    if (!account) return []
    const tweets = this.processingTweets[account]
    if (!tweets) return []
    return tweets.map((id) => ({
      id: id,
      status: this.getTweetStatus(id),
    }))
  }

  get lastApprovedTweet() {
    return this.currentUserTweets.find(
      async ({ status }) => (await status) === TweetStatus.approved
    )
  }

  get pendingTweets() {
    return this.currentUserTweets.filter(
      async ({ status }) => (await status) === TweetStatus.pending
    )
  }
}

export const tweetStatusStore = proxy(new TweetStatusStore()).makePersistent(
  true
)

void tweetStatusStore.initFetchTweetList()

export default tweetStatusStore
