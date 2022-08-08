import { providers } from 'ethers'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/providers/defaultProvider'
import transformObjectValues from 'helpers/transformObjectValues'

class ContractsStore extends PersistableStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  currentBlock?: number
  addressToTokenIds?: Promise<{ [address: string]: string[] } | undefined>

  provider: providers.Provider

  constructor(provider: providers.Provider) {
    super()
    this.provider = provider
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['addressToTokenIds']
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
    return this.provider.getBlockNumber()
  }

  async fetchMoreContractsOwned(accountChange?: boolean) {
    const account = WalletStore.account
    if (!account) return
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    if (!this.connectedAccounts[account])
      this.connectedAccounts[account] = new ContractSynchronizer(account, 0)

    if (
      !this.addressToTokenIds &&
      this.connectedAccounts[account].mapAddressToTokenIds
    ) {
      this.addressToTokenIds = Promise.resolve(
        this.connectedAccounts[account].mapAddressToTokenIds
      )
    }

    const request = this.connectedAccounts[account].syncAddressToTokenIds(
      this.currentBlock
    )

    this.addressToTokenIds =
      (this.addressToTokenIds && accountChange) || !this.addressToTokenIds
        ? request
        : Promise.resolve(await request)
  }
}

export const contractsStore = proxy(
  new ContractsStore(defaultProvider)
).makePersistent(true)

subscribeKey(WalletStore, 'account', () => {
  void contractsStore.fetchMoreContractsOwned(true)
})

defaultProvider.on('block', async (blockNumber: number) => {
  contractsStore.currentBlock = blockNumber
  await contractsStore.fetchMoreContractsOwned()
})

export default contractsStore
