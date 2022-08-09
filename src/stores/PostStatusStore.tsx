import {
  ERC721PostStore,
  EmailPostStore,
  ExternalERC721PostStore,
  PostStore,
} from 'stores/PostStore'
import { PostIdAndStatus } from 'models/PostStatusResponse'
import { PersistableStore } from '@big-whale-labs/stores'
import { getPostsByIdsFromPoster } from 'helpers/getPostsFromPoster'
import { getPostsFromPoster } from 'helpers/getPostsFromPoster'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import env from 'helpers/env'

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
  const postStatusStore = proxy(new PostStatusStore(store)).makePersistent(
    env.VITE_ENCRYPT_KEY
  )

  let locked = true
  void postStatusStore.fetchPostsStatuses().then(() => (locked = false))

  setInterval(async () => {
    if (!locked) {
      locked = true
      await postStatusStore.fetchPostsStatuses()
      locked = false
    }
  }, 60000) // poll posts list every minute

  return postStatusStore
}

export const EmailPostStatusStore = createPostStatusStore(EmailPostStore)
export const ERC721PostStatusStore = createPostStatusStore(ERC721PostStore)
export const ExternalERC721PostStatusStore = createPostStatusStore(
  ExternalERC721PostStore
)
