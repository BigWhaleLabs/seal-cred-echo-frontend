import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import DomainSynchronizer, {
  DomainSynchronizerSchema,
} from 'helpers/DomainSynchronizer'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import transformObjectValues from 'helpers/transformObjectValues'

class ContractsStore extends PersistableStore {
  connectedAccounts: { [account: string]: DomainSynchronizer } = {}
  currentDomainAddresses?: Promise<string[] | undefined>

  replacer = (key: string, value: unknown) => {
    const disallowList = ['currentDomains']
    return disallowList.includes(key) ? undefined : value
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'connectedAccounts') {
      return transformObjectValues(
        value as { [account: string]: DomainSynchronizerSchema },
        DomainSynchronizer.fromJSON
      )
    }
    return value
  }

  async fetchDomains(accountChange?: boolean) {
    if (!WalletStore.account) return

    if (!this.connectedAccounts[WalletStore.account])
      this.connectedAccounts[WalletStore.account] = new DomainSynchronizer(
        WalletStore.account
      )

    if (
      !this.currentDomainAddresses &&
      this.connectedAccounts[WalletStore.account].domainAddresses
    ) {
      this.currentDomainAddresses = Promise.resolve(
        this.connectedAccounts[WalletStore.account].domainAddresses
      )
    }

    if (!this.currentDomainAddresses || accountChange) {
      this.currentDomainAddresses =
        this.connectedAccounts[WalletStore.account].fetchDomains()
      return
    }

    const result = await this.connectedAccounts[
      WalletStore.account
    ].fetchDomains()

    this.currentDomainAddresses = Promise.resolve(result)
  }
}

export const GeneralContractsStore = proxy(new ContractsStore()).makePersistent(
  true
)

subscribeKey(WalletStore, 'account', () => {
  void GeneralContractsStore.fetchDomains(true)
})

export default ContractsStore
