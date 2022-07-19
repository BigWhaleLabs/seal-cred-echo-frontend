import { providers } from 'ethers'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import PersistableStore from 'stores/persistence/PersistableStore'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'
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

  async fetchMoreContractsOwned(account?: string, accountChange?: boolean) {
    if (!account) return
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    const emailDerivativeContracts =
      await SealCredStore.emailDerivativeContracts

    if (!this.connectedAccounts[account])
      this.connectedAccounts[account] = new ContractSynchronizer(
        account,
        SealCredStore.firstBlockId
      )

    if (
      !this.addressToTokenIds &&
      this.connectedAccounts[account].mapAddressToTokenIds
    ) {
      this.addressToTokenIds = Promise.resolve(
        this.connectedAccounts[account].mapAddressToTokenIds
      )
    }

    const request = this.connectedAccounts[account].syncAddressToTokenIds(
      this.currentBlock,
      emailDerivativeContracts
    )

    this.addressToTokenIds =
      (this.addressToTokenIds && accountChange) || !this.addressToTokenIds
        ? request
        : Promise.resolve(await request)
  }
}

export const GeneralContractsStore = proxy(
  new ContractsStore(defaultProvider)
).makePersistent(true)

subscribeKey(WalletStore, 'account', (account) => {
  void GeneralContractsStore.fetchMoreContractsOwned(account, true)
})

defaultProvider.on('block', async (blockNumber: number) => {
  GeneralContractsStore.currentBlock = blockNumber
  await GeneralContractsStore.fetchMoreContractsOwned(WalletStore.account)
})

export default ContractsStore
