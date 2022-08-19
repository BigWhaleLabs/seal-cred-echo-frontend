import { ContractsStore as BaseContractsStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import Network from '@big-whale-labs/stores/dist/models/Network'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'

export const ContractsStore = proxy(
  new BaseContractsStore(defaultProvider, defaultProvider, Network.Goerli)
).makePersistent(env.VITE_ENCRYPT_KEY)

subscribeKey(WalletStore, 'account', (account) => {
  if (account) {
    void ContractsStore.fetchMoreContractsOwned(account, true)
  }
})

defaultProvider.on('block', async (blockNumber: number) => {
  ContractsStore.currentBlock = blockNumber
  if (WalletStore.account) {
    await ContractsStore.fetchMoreContractsOwned(WalletStore.account)
  }
})

export default ContractsStore
