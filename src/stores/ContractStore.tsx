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
    if (!WalletStore.account) return
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    console.log(this.connectedAccounts[WalletStore.account])
    if (!this.connectedAccounts[WalletStore.account])
      this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )

    if (!this.addressToTokenIds || accountChange) {
      this.addressToTokenIds = this.connectedAccounts[
        WalletStore.account
      ].syncAddressToTokenIds(this.currentBlock)
      return
    }

    const result = await this.connectedAccounts[
      WalletStore.account
    ].syncAddressToTokenIds(this.currentBlock)

    this.addressToTokenIds = Promise.resolve(result)
  }
}

export const ContractsStore = proxy(new ContractsStoreClass()).makePersistent()

subscribeKey(WalletStore, 'account', () => {
  void ContractsStore.fetchMoreContractsOwned(true)
})

defaultProvider.on('block', async (blockNumber: number) => {
  ContractsStore.currentBlock = blockNumber
  await ContractsStore.fetchMoreContractsOwned()
})

export default ContractsStoreClass
