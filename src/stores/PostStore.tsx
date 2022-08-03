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
import SCEmailPostStorageContract from 'helpers/contracts/SCEmailPostStorageContract'
import SCExternalERC721PostStorageContract from 'helpers/contracts/SCExternalERC721PostStorageContract'
import WalletStore from 'stores/WalletStore'
import getBlockchainEmailPosts from 'helpers/getBlockchainEmailPosts'
import getBlockchainExternalERC721Posts from 'helpers/getBlockchainExternalERC721Posts'
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
  blockchainExternalERC721Posts: Promise<PostModel[]>
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
  blockchainEmailPosts: getBlockchainEmailPosts(),
  blockchainExternalERC721Posts: getBlockchainExternalERC721Posts(),
})

async function addEmailPost(
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  console.log('add', { id, post, derivativeAddress, sender, timestamp })
  const storage = await PostStore.blockchainEmailPosts
  if (!storage.find(({ id: postId }) => postId === id)) {
    PostStore.blockchainEmailPosts = Promise.resolve([
      getPostRecord(id, post, derivativeAddress, sender, timestamp),
      ...storage,
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

async function addExternalERC721Post(
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  console.log('add', { id, post, derivativeAddress, sender, timestamp })
  const storage = await PostStore.blockchainExternalERC721Posts
  if (!storage.find(({ id: postId }) => postId === id)) {
    PostStore.blockchainExternalERC721Posts = Promise.resolve([
      getPostRecord(id, post, derivativeAddress, sender, timestamp),
      ...storage,
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

SCEmailPostStorageContract.on(
  SCEmailPostStorageContract.filters.PostSaved(),
  async (id, post, derivativeAddress, sender, timestamp) => {
    const postId = id.toNumber()
    console.info('EmailPost event', postId, post, derivativeAddress)
    await addEmailPost(postId, post, derivativeAddress, sender, timestamp)
  }
)
SCExternalERC721PostStorageContract.on(
  SCExternalERC721PostStorageContract.filters.PostSaved(),
  async (id, post, derivativeAddress, sender, timestamp) => {
    const postId = id.toNumber()
    console.info('ExternalERC721Post event', postId, post, derivativeAddress)
    await addExternalERC721Post(
      postId,
      post,
      derivativeAddress,
      sender,
      timestamp
    )
  }
)

export default PostStore
