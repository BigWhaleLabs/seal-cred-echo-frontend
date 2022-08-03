import { PostIdAndStatus } from 'models/PostStatusModel'
import { getPostsFromPoster } from 'helpers/getPostsFromPoster'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import PostStatus from 'models/PostStatus'

class PostStatusStore extends PersistableStore {
  postsStatuses: PostIdAndStatus = {}

  async initFetchPostsStatuses() {
    this.postsStatuses = await getPostsFromPoster()
  }

  getPostStatus(id: number) {
    return this.postsStatuses[id]?.status || PostStatus.pending
  }
}

const postStatusStore = proxy(new PostStatusStore()).makePersistent(true)

void postStatusStore.initFetchPostsStatuses()

export default postStatusStore
