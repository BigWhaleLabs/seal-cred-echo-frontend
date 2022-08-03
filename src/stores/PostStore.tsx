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
import SCERC721PostsContract from 'helpers/contracts/SCERC721PostsContract'
import SCEmailPostsContract from 'helpers/contracts/SCEmailPostsContract'
import WalletStore from 'stores/WalletStore'
import getERC721BlockchainPosts from 'helpers/getERC721BlockchainPosts'
import getEmailBlockchainPosts from 'helpers/getEmailBlockchainPosts'
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
  blockchainEmailPosts: Promise<PostModel[]>
  blockchainERC721Posts: Promise<PostModel[]>
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

        await addEmailPost(
          id.toNumber(),
          post,
          derivativeAddress,
          sender,
          timestamp
        )
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

        await addERC721Post(
          id.toNumber(),
          post,
          derivativeAddress,
          sender,
          timestamp
        )
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
  blockchainERC721Posts: getERC721BlockchainPosts(),
  blockchainEmailPosts: getEmailBlockchainPosts(),
})

async function addEmailPost(
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  console.log('add', { id, post, derivativeAddress, sender, timestamp })
  const ledger = await PostStore.blockchainEmailPosts
  if (!ledger.find(({ id: ledgerPostId }) => ledgerPostId === id)) {
    PostStore.blockchainEmailPosts = Promise.resolve([
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

async function addERC721Post(
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  const ledger = await PostStore.blockchainEmailPosts
  if (!ledger.find(({ id: ledgerPostId }) => ledgerPostId === id)) {
    PostStore.blockchainEmailPosts = Promise.resolve([
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

SCERC721PostsContract.on(
  SCERC721PostsContract.filters.PostSaved(),
  async (id, post, derivativeAddress, sender, timestamp) => {
    const postId = id.toNumber()
    console.info('SCERC721Post event', postId, post, derivativeAddress)
    await addERC721Post(postId, post, derivativeAddress, sender, timestamp)
  }
)

SCEmailPostsContract.on(
  SCEmailPostsContract.filters.PostSaved(),
  async (id, post, derivativeAddress, sender, timestamp) => {
    const postId = id.toNumber()
    console.info('SCEmailPost event', postId, post, derivativeAddress)
    await addEmailPost(postId, post, derivativeAddress, sender, timestamp)
  }
)

export default PostStore
