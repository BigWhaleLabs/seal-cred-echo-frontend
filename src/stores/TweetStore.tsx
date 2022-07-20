import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetModel from 'models/TweetModel'
import TweetStatus from 'models/TweetStatus'
import twitterPoster from 'helpers/twitterPoster'

class TweetStore extends PersistableStore {
  currentTweet?: TweetModel
  tweets: TweetModel[] = []

  async updateTweestList() {
    if (!this.currentTweet) return

    this.tweets = await twitterPoster()
  }

  getTweetStatus(id: number) {
    const status =
      this.tweets.find(({ tweetId }) => tweetId === id)?.status ||
      TweetStatus.pending
    return status
  }

  constructor() {
    super()

    setInterval(async () => {
      await this.updateTweestList()
    }, 30000) // request every 30 seconds
  }
}

export default proxy(new TweetStore()).makePersistent()
