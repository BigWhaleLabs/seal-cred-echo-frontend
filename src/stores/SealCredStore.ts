import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import getLedger from 'helpers/getLedger'
import ledgerContracts from 'helpers/ledgerContracts'

interface SealCredStoreType {
  ledgers: {
    [name: string]: Promise<Ledger>
  }
}

const SealCredStore = proxy<SealCredStoreType>({
  ledgers: Object.keys(ledgerContracts).reduce((prev, key) => {
    return {
      ...prev,
      [key]: getLedger(ledgerContracts[key]),
    }
  }, {}),
})

for (const [name, ledgerContract] of Object.entries(ledgerContracts)) {
  ledgerContract.on(
    ledgerContract.filters.CreateDerivative(),
    async (original, derivative) => {
      const ledger = await SealCredStore.ledgers[name]
      ledger[original] = {
        derivative,
        original,
      }
    }
  )
  ledgerContract.on(
    ledgerContract.filters.DeleteOriginal(),
    async (original) => {
      const ledger = await SealCredStore.ledgers[name]
      delete ledger[original]
    }
  )
}

export default SealCredStore
