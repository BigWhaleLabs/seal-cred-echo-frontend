import { BigNumber, providers } from 'ethers'
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
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
import relayProvider from 'helpers/providers/relayProvider'

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
      (await this.contract.getAllPosts()).map(
        ({ id, post, derivativeAddress, sender, timestamp }) =>
          getPostRecord(id, post, derivativeAddress, sender, timestamp)
      )
    )
  }

  async createPost(text: string, original: string) {
    const walletProvider = WalletStore.provider
    if (!walletProvider) throw new Error('No provider found')
    if (!WalletStore.account) throw new Error('No account found')

    try {
      const gsnProvider = await relayProvider(walletProvider)

      const ethersProvider = new Web3Provider(
        gsnProvider as unknown as ExternalProvider
      )

      const { maxFeePerGas } = await gsnProvider.calculateGasFees()

      const contract = this.createContractWithProvider(
        ethersProvider.getSigner(0)
      )

      const transaction = await contract.savePost(text, original, {
        gasLimit: 2e6,
        maxFeePerGas,
        maxPriorityFeePerGas: maxFeePerGas,
      })
      const result = await transaction.wait()

      return Promise.all(
        result.logs
          .filter(({ address }) => address === contract.address)
          .map(({ data, topics }) => parsePostLogData({ data, topics }))
          .map(({ args }) => args)
          .map(({ id, post, derivativeAddress, sender, timestamp }) =>
            this.addPost(id, post, derivativeAddress, sender, timestamp)
          )
      )
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.includes('insufficient funds for gas * price + value') ||
          error.message.includes('Proposed priority gas fee'))
      ) {
        handleError(
          new Error(
            'Oops, something went wrong. Please, try again in several minutes.'
          )
        )
      } else {
        handleError(error)
      }
      throw error
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
  new PostStore(env.VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS)
)

export const ERC721PostStore = proxy(
  new PostStore(env.VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS)
)

export const ExternalERC721PostStore = proxy(
  new PostStore(env.VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS)
)
