import {
  EmailPostStatusStore,
  ExternalPostStatusStore,
} from 'stores/PostStatusStore'
import { EmailPostStore, ExternalPostStore, PostStore } from 'stores/PostStore'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'
import WalletStore from 'stores/WalletStore'

export class PostProcessingStore {
  store: PostStore
  statusStore: PostStatusStore
  processingIds: { [account: string]: number[] | undefined } = {}

  constructor(store: PostStore, statusStore: PostStatusStore) {
    this.store = store
    this.statusStore = statusStore

    this.store.contract.on(
      this.store.contract.filters.PostSaved(),
      async (id, post, derivativeAddress, sender, timestamp) => {
        console.info('Post event', id, post, derivativeAddress)
        const record = await this.store.addPost(
          id,
          post,
          derivativeAddress,
          sender,
          timestamp
        )
        this.addPost(record)
      }
    )
  }

  async fetchProcessingPosts() {
    if (WalletStore.account) {
      const posts = await this.store.posts

      const records = posts
        ? posts
            .filter(
              (record) =>
                record.sender === WalletStore.account &&
                this.statusStore.getPostStatus(record.id) === PostStatus.pending
            )
            .map((record) => record.id)
        : []
      this.processingIds[WalletStore.account] = records
    }
  }

  updateStatus() {
    const account = WalletStore.account
    if (!account) return
    const ids = this.processingIds[account]
    if (!ids?.length) return
    return this.statusStore.updatePostsStatusesByIds(ids)
  }

  async createPost(text: string, original: string) {
    const [record] = await this.store.createPost(text, original)
    this.addPost(record)
  }

  addPost({ id, sender }: { id: number; sender: string }) {
    const processingIds = this.processingIds[sender]
    if (this.statusStore.postsStatuses[id])
      this.statusStore.postsStatuses[id] = {
        tweetId: id,
        status: PostStatus.pending,
      }
    if (processingIds)
      return (this.processingIds[sender] = [id, ...processingIds])
    this.processingIds[sender] = [id]
  }
}

function createPostProcessingStore(
  store: PostStore,
  statusStore: PostStatusStore
) {
  const processingPostsStore = proxy(
    new PostProcessingStore(store, statusStore)
  )

  subscribeKey(WalletStore, 'account', () => {
    void processingPostsStore.fetchProcessingPosts()
  })

  setInterval(() => {
    void processingPostsStore.updateStatus()
  }, 10000) // poll posts list every 10 seconds

  return processingPostsStore
}

export const EmailProcessingPostsStore = createPostProcessingStore(
  EmailPostStore,
  EmailPostStatusStore
)
export const ExternalProcessingPostsStore = createPostProcessingStore(
  ExternalPostStore,
  ExternalPostStatusStore
)
