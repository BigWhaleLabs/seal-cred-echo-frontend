import { BigNumber, providers } from 'ethers'
import {
  SCPostStorage,
  SCPostStorage__factory,
} from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
import PostModel from 'models/PostModel'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'
import getPostRecord from 'helpers/contracts/getPostRecord'
import handleError from 'helpers/handleError'
import parsePostLogData from 'helpers/parsePostLogData'

export class PostStore {
  address: string
  contract: SCPostStorage
  posts: Promise<PostModel[]>

  constructor(address: string) {
    this.address = address
    this.contract = this.createContractWithProvider(defaultProvider)
    this.posts = this.fetchBlockchainPosts()
  }

  createContractWithProvider(
    provider: providers.JsonRpcSigner | providers.Provider
  ) {
    return SCPostStorage__factory.connect(this.address, provider)
  }

  async fetchBlockchainPosts() {
    return Promise.resolve(
      (await this.contract.getAllPosts())
        .map(({ id, post, derivativeAddress, sender, timestamp }) =>
          getPostRecord(id, post, derivativeAddress, sender, timestamp)
        )
        .reverse()
    )
  }

  async createPost(text: string, original: string) {
    try {
      if (!WalletStore.provider) throw new Error('No provider found')
      const contract = this.createContractWithProvider(
        WalletStore.provider.getSigner(0)
      )

      const transaction = await contract.savePost(text, original)
      const result = await transaction.wait()

      return Promise.all(
        result.logs
          .map(({ data, topics }) => parsePostLogData({ data, topics }))
          .map(({ args }) => args)
          .map(({ id, post, derivativeAddress, sender, timestamp }) =>
            this.addPost(id, post, derivativeAddress, sender, timestamp)
          )
      )
    } catch (error) {
      handleError(error)
      const parsedError =
        error instanceof Error ? error : new Error('Failed to create post')
      throw parsedError
    }
  }

  async addPost(
    id: BigNumber,
    post: string,
    derivativeAddress: string,
    sender: string,
    timestamp: BigNumber
  ) {
    const record = getPostRecord(id, post, derivativeAddress, sender, timestamp)
    const posts = await this.posts
    if (!posts.find(({ id: postId }) => postId === id.toNumber())) {
      this.posts = Promise.resolve([record, ...posts])
    }
    return record
  }
}

export const EmailPostStore = proxy(
  new PostStore(env.VITE_SC_EMAIL_POST_STORAGE_CONTRACT)
)

export const ExternalPostStore = proxy(
  new PostStore(env.VITE_SC_EXTERNAL_ERC721_POST_STORAGE_CONTRACT)
)
