import { BigNumber } from 'ethers'
import { parsePostSavedLogData } from 'helpers/createPost'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ERC721Post from 'helpers/posts/ERC721Post'
import EmailPost from 'helpers/posts/EmailPost'
import PostModel from 'models/PostModel'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'
import ProcessingPostsStore from 'stores/ProcessingPostsStore'
import SCPostStorageContract from 'helpers/contracts/SCPostStorageContract'
import WalletStore from 'stores/WalletStore'
import getBlockchainPosts from 'helpers/getBlockchainPosts'
import getPostRecord from 'helpers/contracts/getPostRecord'
import handleError from 'helpers/handleError'

interface PostStoreInterface {
  calculatedMaxLength?: number
  status: {
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentPost?: EmailPost | ERC721Post
  createEmailPost: ({
    post,
    domain,
  }: {
    post: string
    domain: string
  }) => Promise<void>
  createERC721Post: ({
    post,
    originalContract,
  }: {
    post: string
    originalContract: string
  }) => Promise<void>
  blockchainPosts: Promise<PostModel[]>
}

const PostStore = proxy<PostStoreInterface>({
  status: { loading: false },
  currentPost: undefined,
  createEmailPost: async ({
    post,
    domain,
  }: {
    post: string
    domain: string
  }) => {
    PostStore.status = {
      loading: false,
    }
    PostStore.status.loading = true
    try {
      const transaction = await WalletStore.saveEmailPost({
        post,
        domain,
      })

      for (const { data, topics } of transaction.logs) {
        const {
          args: { id, post, derivativeAddress, sender, timestamp },
        } = parsePostSavedLogData({ data, topics })

        console.log('add', { id, post, derivativeAddress, sender, timestamp })

        await addPost(id.toNumber(), post, derivativeAddress, sender, timestamp)
      }
    } catch (error) {
      handleError(error)
      PostStore.status.error =
        error instanceof Error ? error : new Error('Failed to create post')
      throw error
    } finally {
      PostStore.status.loading = false
    }
  },
  createERC721Post: async ({
    post,
    originalContract,
  }: {
    post: string
    originalContract: string
  }) => {
    PostStore.status = {
      loading: false,
    }
    PostStore.status.loading = true
    try {
      const transaction = await WalletStore.saveERC721Post({
        post,
        originalContract,
      })

      console.log('transaction', transaction)

      for (const { data, topics } of transaction.logs) {
        const {
          args: { id, post, derivativeAddress, sender, timestamp },
        } = parsePostSavedLogData({ data, topics })

        console.log('parsed', {
          id,
          post,
          derivativeAddress,
          sender,
          timestamp,
        })

        await addPost(id.toNumber(), post, derivativeAddress, sender, timestamp)
      }
    } catch (error) {
      handleError(error)
      PostStore.status.error =
        error instanceof Error ? error : new Error('Failed to create post')
      throw error
    } finally {
      PostStore.status.loading = false
    }
  },
  blockchainPosts: getBlockchainPosts(),
})

async function addPost(
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  console.log('add', { id, post, derivativeAddress, sender, timestamp })
  const ledger = await PostStore.blockchainPosts
  if (!ledger.find(({ id: ledgerPostId }) => ledgerPostId === id)) {
    PostStore.blockchainPosts = Promise.resolve([
      getPostRecord(id, post, derivativeAddress, sender, timestamp),
      ...ledger,
    ])
    const processingPostIds = ProcessingPostsStore.processingPostIds[sender]

    if (PostStatusStore.postsStatuses[id])
      PostStatusStore.postsStatuses[id] = {
        tweetId: id,
        status: PostStatus.pending,
      }

    if (processingPostIds) {
      ProcessingPostsStore.processingPostIds[sender] = [
        id,
        ...processingPostIds,
      ]
      return
    }

    ProcessingPostsStore.processingPostIds[sender] = [id]
  }
}

subscribeKey(WalletStore, 'account', () => {
  PostStore.currentPost = undefined
})

SCPostStorageContract.on(
  SCPostStorageContract.filters.PostSaved(),
  async (id, post, derivativeAddress, sender, timestamp) => {
    const postId = id.toNumber()
    console.info('post event', postId, post, derivativeAddress)
    await addPost(postId, post, derivativeAddress, sender, timestamp)
  }
)

export default PostStore
