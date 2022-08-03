import { PostIdAndStatus } from 'models/PostStatusModel'
import { getPostsByIdsFromPoster } from 'helpers/getPostsFromPoster'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'
import PostStore from 'stores/PostStore'
import WalletStore from 'stores/WalletStore'

class ProcessingPostsStore {
  processingPostIds: { [account: string]: number[] | undefined } = {}

  async fetchProcessingPosts() {
    if (WalletStore.account) {
      const blockchainPosts = await PostStore.blockchainPosts
      const records = blockchainPosts
        .filter(
          (record) =>
            record.sender === WalletStore.account &&
            PostStatusStore.getPostStatus(record.id) === PostStatus.pending
        )
        .map((record) => record.id)
      this.processingPostIds[WalletStore.account] = records
    }
  }

  async updateStatus() {
    const account = WalletStore.account
    if (!account) return
    const posts = this.processingPostIds[account]
    if (!posts?.length) return
    const result = await getPostsByIdsFromPoster(posts)
    if (result) {
      const postsStatuses = {} as PostIdAndStatus
      for (const post of result) {
        postsStatuses[post.tweetId] = post
      }
      PostStatusStore.postsStatuses = {
        ...PostStatusStore.postsStatuses,
        ...postsStatuses,
      }
    }
  }
}

const processingPostsStore = proxy(new ProcessingPostsStore())

subscribeKey(WalletStore, 'account', () => {
  void processingPostsStore.fetchProcessingPosts()
})

setInterval(() => {
  void processingPostsStore.updateStatus()
}, 10000) // poll posts list every 10 seconds

export default processingPostsStore
