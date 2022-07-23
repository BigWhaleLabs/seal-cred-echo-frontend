import { TweetIdAndStatus } from 'models/TweetModel'
import { getTweetsFromPoster } from 'helpers/getTweetsFromPoster'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStatus from 'models/TweetStatus'

class TweetStatusStore extends PersistableStore {
  tweetsStatuses: TweetIdAndStatus = {}

  async initFetchTweetList() {
    this.tweetsStatuses = await getTweetsFromPoster()
  }

  getTweetStatus(id: number) {
    return this.tweetsStatuses[id] || TweetStatus.pending
  }
}

const tweetStatusStore = proxy(new TweetStatusStore()).makePersistent(true)

void tweetStatusStore.initFetchTweetList()

export default tweetStatusStore
