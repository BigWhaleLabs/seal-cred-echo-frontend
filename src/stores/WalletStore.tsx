import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import TweetStructure from 'models/TweetStructure'
import createErc721Post from 'helpers/createPost'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore extends PersistableStore {
  account?: string
  walletLoading = false
  walletsToNotifiedOfBeingDoxxed = {} as {
    [address: string]: boolean
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['account', 'walletLoading']
    return disallowList.includes(key) ? undefined : value
  }

  get cachedProvider() {
    return web3Modal.cachedProvider
  }

  async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== env.VITE_ETH_NETWORK && env.VITE_ETH_NETWORK)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      this.account = (await provider.listAccounts())[0]
      this.subscribeProvider(instance)
    } catch (error) {
      if (error !== 'Modal closed by user') {
        handleError(error)
        this.clearData()
      }
    } finally {
      this.walletLoading = false
    }
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    this.account = accounts[0]
    this.walletLoading = false
  }

  savePost({ tweet, domain }: TweetStructure) {
    if (!provider) throw new Error('No provider found')

    if (!tweet) throw new Error('Invalid tweet')
    if (!domain) throw new Error('Invalid domain')

    return createErc721Post({ tweet, domain }, provider)
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) this.clearData()

      this.account = undefined
      void this.handleAccountChanged()
    })
    provider.on('disconnect', (error: unknown) => {
      if (provider) provider.removeAllListeners()
      handleError(error)
      this.clearData()
    })
    provider.on('chainChanged', async () => {
      this.account = undefined
      await this.connect()
    })
  }

  private clearData() {
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

const walletStore = proxy(new WalletStore()).makePersistent(true)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
