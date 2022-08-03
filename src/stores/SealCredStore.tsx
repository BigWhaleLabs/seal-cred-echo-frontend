import {
  ExternalSCERC721LedgerContract,
  SCEmailLedgerContract,
} from 'helpers/contracts/sealCredContracts'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import ERC721Ledger from 'models/ERC721Ledger'
import EmailLedger from 'models/EmailLedger'
import getERC721LedgerRecord from 'helpers/contracts/getERC721LedgerRecord'
import getEmailLedger from 'helpers/contracts/getEmailLedger'
import getEmailLedgerRecord from 'helpers/contracts/getEmailLedgerRecord'
import getExternalSCERC721Ledger from 'helpers/contracts/getExternalSCERC721Ledger'

interface SealCredStoreType {
  emailLedger: Promise<EmailLedger>
  externalERC721Ledger: Promise<ERC721Ledger>
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
        ({ derivativeContract }) => derivativeContract
      ),
    externalERC721derivativeContracts: async (get) =>
      Object.values(await get(state).externalERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    derivativeContracts: async (get) => [
      ...Object.values(await get(state).externalERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
      ...Object.values(await get(state).emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ],
  },
  { proxy: state }
)

SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.CreateDerivativeContract(),
  async (domain, derivativeContract) => {
    console.info('CreateDerivativeContract event', domain, derivativeContract)
    const ledger = await SealCredStore.emailLedger
    if (!ledger[domain]) {
      ledger[domain] = getEmailLedgerRecord(derivativeContract, domain)
      SealCredStore.emailLedger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.DeleteEmail(),
  async (domain) => {
    console.info('DeleteOriginalContract event', domain)
    const ledger = await SealCredStore.emailLedger
    delete ledger[domain]
  }
)

ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivativeContract event (external)',
      originalContract,
      derivativeContract
    )
    const ledger = await SealCredStore.externalERC721Ledger
    if (!ledger[originalContract]) {
      ledger[originalContract] = getERC721LedgerRecord(
        originalContract,
        derivativeContract
      )
      SealCredStore.externalERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event (external)', originalContract)
    const ledger = await SealCredStore.externalERC721Ledger
    delete ledger[originalContract]
  }
)

export default SealCredStore
