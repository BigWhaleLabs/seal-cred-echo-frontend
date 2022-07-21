import { TweetIdAndStatus } from 'models/TweetModel'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'
import getTweetsFromPoster from 'helpers/getTweetsFromPoster'

class TweetStatusStore extends PersistableStore {
  tweetsStatuses: TweetIdAndStatus = {}

  async fetchTweetList() {
    this.tweetsStatuses = await getTweetsFromPoster()
  }

  getTweetStatus(id: number) {
    return this.tweetsStatuses[id] || TweetStatus.pending
  }
}

export const tweetStatusStore = proxy(new TweetStatusStore()).makePersistent()

void tweetStatusStore.fetchTweetList()

setInterval(() => {
  void tweetStatusStore.fetchTweetList()
}, 10000) // poll tweets list every 10 seconds

export default tweetStatusStore
