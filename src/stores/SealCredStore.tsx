import {
  ExternalSCERC721LedgerContract,
  SCEmailLedgerContract,
} from 'helpers/contracts/sealCredContracts'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import LedgerModel from 'models/LedgerModel'
import getEmailLedger from 'helpers/contracts/getEmailLedger'
import getExternalSCERC721Ledger from 'helpers/contracts/getExternalSCERC721Ledger'
import getLedgerRecord from 'helpers/contracts/getLedgerRecord'

interface SealCredStoreType {
  emailLedger: Promise<LedgerModel>
  externalERC721Ledger: Promise<LedgerModel>
}

interface ComputedSealCredStoreType {
  emailDerivativeContracts: Promise<string[]>
  externalERC721derivativeContracts: Promise<string[]>
  derivativeContracts: Promise<string[]>
}

const state = proxy<SealCredStoreType>({
  emailLedger: getEmailLedger(SCEmailLedgerContract),
  externalERC721Ledger: getExternalSCERC721Ledger(
    ExternalSCERC721LedgerContract
  ),
})

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  {
    emailDerivativeContracts: async (get) =>
      Object.values((await get(state).emailLedger) || {}).map(
        ({ derivative }) => derivative
      ),
    externalERC721derivativeContracts: async (get) =>
      Object.values(await get(state).externalERC721Ledger).map(
        ({ derivative }) => derivative
      ),
    derivativeContracts: async (get) => [
      ...Object.values(await get(state).externalERC721Ledger).map(
        ({ derivative }) => derivative
      ),
      ...Object.values(await get(state).emailLedger).map(
        ({ derivative }) => derivative
      ),
    ],
  },
  { proxy: state }
)

SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.CreateDerivative(),
  async (original, derivative) => {
    console.info('CreateDerivative event', original, derivative)
    const ledger = await SealCredStore.emailLedger
    if (!ledger[original]) {
      ledger[original] = getLedgerRecord(original, derivative)
      SealCredStore.emailLedger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.DeleteOriginal(),
  async (original) => {
    console.info('DeleteOriginal event', original)
    const ledger = await SealCredStore.emailLedger
    delete ledger[original]
  }
)

ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.CreateDerivative(),
  async (original, derivative) => {
    console.info('CreateDerivative event (external)', original, derivative)
    const ledger = await SealCredStore.externalERC721Ledger
    if (!ledger[original]) {
      ledger[original] = getLedgerRecord(original, derivative)
      SealCredStore.externalERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.DeleteOriginal(),
  async (original) => {
    console.info('DeleteOriginal event (external)', original)
    const ledger = await SealCredStore.externalERC721Ledger
    delete ledger[original]
  }
)

export default SealCredStore
