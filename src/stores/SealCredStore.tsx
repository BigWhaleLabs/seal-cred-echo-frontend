import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import data from 'helpers/data'

type DeriveGet = <T extends object>(proxyObject: T) => T
type DeriveStoreType = {
  [x: string]: (get: DeriveGet) => Promise<string[]>
}
interface SealCredStoreType {
  [ledgerName: string]: Promise<Ledger>
}

interface ComputedSealCredStoreType {
  [namedDerivativeContract: string]: Promise<string[]>
}

const dataToStorage: SealCredStoreType = {}
Object.keys(data).map((ledgerName) => {
  dataToStorage[ledgerName] = new Promise(() => data[ledgerName].ledger)
})

const state = proxy<SealCredStoreType>(dataToStorage)

function constructDerive() {
  const contractNameToDerivatives: DeriveStoreType = {
    derivativeContracts: async (get) => {
      const ledgers = await Promise.all(Object.values(get(state)))
      const derivatives = []
      for (const ledger of ledgers) derivatives.push(...Object.values(ledger))
      return derivatives
    },
  }

  const ledgerNames = Object.keys(data)
  for (const ledgerName of ledgerNames)
    contractNameToDerivatives[ledgerName] = async (get) => {
      return Object.values(await get(state)[ledgerName])
    }

  return contractNameToDerivatives
}

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  constructDerive(),
  { proxy: state }
)

function addListeners() {
  Object.keys(data).forEach((ledgerName) => {
    const contract = data[ledgerName].ledger
    contract.on(
      contract.filters.CreateDerivative(),
      async (original, derivative) => {
        console.info('CreateDerivative event', original, derivative)
        const ledger = await SealCredStore[ledgerName]
        if (!ledger[original]) {
          ledger[original] = derivative
          SealCredStore.emailLedger = Promise.resolve({
            ...ledger,
          })
        }
      }
    )
    contract.on(contract.filters.DeleteOriginal(), async (original) => {
      console.info('DeleteOriginal event', original)
      const ledger = await SealCredStore[ledgerName]
      delete ledger[original]
    })
  })
}

addListeners()

export default SealCredStore
