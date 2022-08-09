import { Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import LedgerModel from 'models/Ledger'
import getLedger from 'helpers/getLedger'
import sealCredContracts from 'helpers/contracts'

// should setup all contracts during one function execution, monoid is preferred

const extractDerivativesFromLedgers = async (state: SealCredStoreType) => {
  const ledgers = await Promise.all(Object.values(state))
  const derivatives = Object.values(ledgers).map(
    (ledger) => ledger['derivative']
  )
  return derivatives
}

interface SealCredStoreType {
  [ledgerName: string]: Promise<LedgerModel>
}

interface ComputedSealCredStoreType {
  [namedDerivativeContracts: string]: Promise<string[]>
  derivativeContracts: Promise<string[]>
}

// TODO: promisify all object.values
const state = proxy<SealCredStoreType>(sealCredContracts)

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  {
    emailDerivativeContracts: async (get) =>
      Object.values((await get(state).emailLedger) || {}).map(
        ({ derivative }) => derivative
      ),
    ERC721derivativeContracts: async (get) =>
      Object.values((await get(state).externalERC721Ledger) || {}).map(
        ({ derivative }) => derivative
      ),
    externalERC721derivativeContracts: async (get) =>
      Object.values((await get(state).externalERC721Ledger) || {}).map(
        ({ derivative }) => derivative
      ),
    derivativeContracts: async (get) => {
      return await Promise.all(
        Object.values(get(state)).map(async (ledger) =>
          Object.values(await ledger).map(({ derivative }) => derivative)
        )
      )
    },
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

Object.values(sealCredContracts).forEach((contract) => addListeners(contract))

export default SealCredStore
