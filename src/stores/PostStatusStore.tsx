import { EmailPostStore, ExternalPostStore, PostStore } from 'stores/PostStore'
import { PostIdAndStatus } from 'models/PostStatusModel'
import { getPostsByIdsFromPoster } from 'helpers/getPostsFromPoster'
import { getPostsFromPoster } from 'helpers/getPostsFromPoster'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import PostStatus from 'models/PostStatus'

export default class PostStatusStore extends PersistableStore {
  store: PostStore
  postsStatuses: PostIdAndStatus = {}

  get persistanceName() {
    return `PostStatusStore_${this.store.address}`
  }

  constructor(store: PostStore) {
    super()
    this.store = store
  }

  async fetchPostsStatuses() {
    this.postsStatuses = await getPostsFromPoster(this.store.address)
  }

  getPostStatus(id: number) {
    return this.postsStatuses[id]?.status || PostStatus.pending
  }

  async updatePostsStatusesByIds(ids: number[]) {
    const result = await getPostsByIdsFromPoster(ids, this.store.address)
    if (!result) return
    const postsStatuses = {} as PostIdAndStatus
    for (const post of result) {
      postsStatuses[post.tweetId] = post
    }
    this.postsStatuses = {
      ...this.postsStatuses,
      ...postsStatuses,
    }
  }
}

function createPostStatusStore(store: PostStore) {
  const postStatusStore = proxy(new PostStatusStore(store)).makePersistent(true)

  void postStatusStore.fetchPostsStatuses()

  setInterval(() => {
    void postStatusStore.fetchPostsStatuses()
  }, 10000) // poll posts list every 10 seconds

  return postStatusStore
}

export const EmailPostStatusStore = createPostStatusStore(EmailPostStore)
export const ExternalPostStatusStore = createPostStatusStore(ExternalPostStore)
