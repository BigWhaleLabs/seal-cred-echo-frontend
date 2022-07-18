import { providers } from 'ethers'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'
import transformObjectValues from 'helpers/transformObjectValues'

class ContractsStoreClass extends PersistableStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  currentBlock?: number
  addressToTokenIds?: Promise<{ [address: string]: string[] } | undefined>

  // get persistanceName() {
  //   return `${this.constructor.name}_${this.network}`
  // }

  // provider: providers.Provider
  // network: Network

  constructor() {
    super()
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['addressToTokenIds', 'connectedAccounts']
    return disallowList.includes(key) ? undefined : value
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'connectedAccounts') {
      return transformObjectValues(
        value as { [account: string]: ContractSynchronizerSchema },
        ContractSynchronizer.fromJSON
      )
    }
    return value
  }

  fetchBlockNumber() {
    return defaultProvider.getBlockNumber()
  }

  async fetchMoreContractsOwned(accountChange?: boolean) {
    console.log('fetchMoreContractsOwned')
    if (!WalletStore.account) return
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    console.log(this.connectedAccounts[WalletStore.account])
    if (!this.connectedAccounts[WalletStore.account])
      console.log('!con account', this.connectedAccounts[WalletStore.account])
    this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
      WalletStore.account
    )

    if (!this.addressToTokenIds || accountChange) {
      this.addressToTokenIds = this.connectedAccounts[
        WalletStore.account
      ].syncAddressToTokenIds(this.currentBlock)
      return
    }

    console.log('connectedAccounts', this.connectedAccounts)
    console.log(
      'connectedAccounts account',
      this.connectedAccounts[WalletStore.account]
    )
    const result = await this.connectedAccounts[
      WalletStore.account
    ].syncAddressToTokenIds(this.currentBlock)

    this.addressToTokenIds = Promise.resolve(result)
  }
}

export const ContractsStore = proxy(new ContractsStoreClass()).makePersistent()

// export const MainnetContractsStore = proxy(
//   new ContractsStore(mainnetDefaultProvider, Network.Mainnet)
// ).makePersistent(true)

subscribeKey(WalletStore, 'account', () => {
  void ContractsStore.fetchMoreContractsOwned(true)
  // void MainnetContractsStore.fetchMoreContractsOwned(true)
})

defaultProvider.on('block', async (blockNumber: number) => {
  ContractsStore.currentBlock = blockNumber
  await ContractsStore.fetchMoreContractsOwned()
})
// mainnetDefaultProvider.on('block', async (blockNumber: number) => {
//   MainnetContractsStore.currentBlock = blockNumber
//   await MainnetContractsStore.fetchMoreContractsOwned()
// })

// export default ContractsStore

export default ContractsStoreClass
