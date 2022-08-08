import {
  ExternalSCERC721LedgerContract,
  SCERC721LedgerContract,
  SCEmailLedgerContract,
} from 'helpers/contracts/sealCredContracts'
import { Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import LedgerModel from 'models/LedgerModel'
import getLedger from 'helpers/contracts/getLedger'
import getLedgerRecord from 'helpers/contracts/getLedgerRecord'

interface SealCredStoreType {
  emailLedger: Promise<LedgerModel>
  ERC721Ledger: Promise<LedgerModel>
  externalERC721Ledger: Promise<LedgerModel>
}

interface ComputedSealCredStoreType {
  emailDerivativeContracts: Promise<string[]>
  ERC721derivativeContracts: Promise<string[]>
  externalERC721derivativeContracts: Promise<string[]>
  derivativeContracts: Promise<string[]>
}

const state = proxy<SealCredStoreType>({
  emailLedger: getLedger(SCEmailLedgerContract),
  ERC721Ledger: getLedger(SCERC721LedgerContract),
  externalERC721Ledger: getLedger(ExternalSCERC721LedgerContract),
})

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  {
    emailDerivativeContracts: async (get) =>
      Object.values((await get(state).emailLedger) || {}).map(
        ({ derivative }) => derivative
      ),
    ERC721derivativeContracts: async (get) =>
      Object.values(await get(state).externalERC721Ledger).map(
        ({ derivative }) => derivative
      ),
    externalERC721derivativeContracts: async (get) =>
      Object.values(await get(state).externalERC721Ledger).map(
        ({ derivative }) => derivative
      ),
    derivativeContracts: async (get) => [
      ...Object.values(await get(state).emailLedger).map(
        ({ derivative }) => derivative
      ),
      ...Object.values(await get(state).ERC721Ledger).map(
        ({ derivative }) => derivative
      ),
      ...Object.values(await get(state).externalERC721Ledger).map(
        ({ derivative }) => derivative
      ),
    ],
  },
  { proxy: state }
)

function addListeners(contract: Ledger) {
  contract.on(
    contract.filters.CreateDerivative(),
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
  contract.on(contract.filters.DeleteOriginal(), async (original) => {
    console.info('DeleteOriginal event', original)
    const ledger = await SealCredStore.emailLedger
    delete ledger[original]
  })
}

addListeners(SCEmailLedgerContract)
addListeners(SCERC721LedgerContract)
addListeners(ExternalSCERC721LedgerContract)

export default SealCredStore
