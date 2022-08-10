// import { Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import LedgerModel from 'models/Ledger'
import contracts from 'helpers/contracts'
// import getLedger from 'helpers/getLedger'

// should setup all contracts during one function execution, monoid is preferred
// 1. Get all ledgers with their names and contract.connect
// 2. Setup store

interface SealCredStoreType {
  [ledgerName: string]: Promise<LedgerModel>
}

interface ComputedSealCredStoreType {
  [namedDerivativeContract: string]: Promise<string[]>
  derivativeContracts: Promise<string[]>
}

// TODO: setup each contract as a `[name: string]: Promise<string[]>
const state = proxy<SealCredStoreType>(contracts)

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  {
    derivativeContracts: async (get) => {
      const ledgers = await Promise.all(Object.values(get(state)))
      const derivatives = []
      for (const ledger of ledgers) derivatives.push(...Object.values(ledger))
      return derivatives
    },
  },
  { proxy: state }
)

// function addListeners(contract: Ledger) {
//   contract.on(
//     contract.filters.CreateDerivative(),
//     async (original, derivative) => {
//       console.info('CreateDerivative event', original, derivative)
//       const ledger = await SealCredStore['Email']
//       if (!ledger[original]) {
//         ledger[original] = derivative
//         SealCredStore.emailLedger = Promise.resolve({
//           ...ledger,
//         })
//       }
//     }
//   )
//   contract.on(contract.filters.DeleteOriginal(), async (original) => {
//     console.info('DeleteOriginal event', original)
//     const ledger = await SealCredStore.emailLedger
//     delete ledger[original]
//   })
// }

// setup contract listeners

export default SealCredStore
