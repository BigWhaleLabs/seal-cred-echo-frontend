import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import EmailLedger from 'models/EmailLedger'
import SCEmailLedgerContract from 'helpers/SCEmailLedgerContract'
import getEmailLedger from 'helpers/getEmailLedger'

interface SealCredStoreType {
  emailLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  emailDerivativeContracts: Promise<string[]>
}

const state = proxy<SealCredStoreType>({
  emailLedger: getEmailLedger(SCEmailLedgerContract),
})

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  {
    emailDerivativeContracts: async (get) =>
      Object.values(await get(state).emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
  },
  { proxy: state }
)

// SCEmailLedgerContract.on(
//   SCEmailLedgerContract.filters.CreateDerivativeContract(),
//   async (domain, derivativeContract) => {
//     console.info('CreateDerivativeContract event', domain, derivativeContract)
//     const ledger = await SealCredStore.emailLedger
//     if (!ledger[domain]) {
//       ledger[domain] = getEmailLedgerRecord(derivativeContract, domain)
//       SealCredStore.emailLedger = Promise.resolve({
//         ...ledger,
//       })
//     }
//   }
// )
// SCEmailLedgerContract.on(
//   SCEmailLedgerContract.filters.DeleteEmail(),
//   async (domain) => {
//     console.info('DeleteOriginalContract event', domain)
//     const ledger = await SealCredStore.emailLedger
//     delete ledger[domain]
//   }
// )

export default SealCredStore
