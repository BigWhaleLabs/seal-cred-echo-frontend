import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import SealCredStore from 'stores/SealCredStore'
import data from 'data'

export default function () {
  const { addressToTokenIds } = useSnapshot(ContractsStore)
  const { ledgers } = useSnapshot(SealCredStore)

  const derivativesAddressesOwned = [] as string[]
  for (const key in data) {
    const ledger = ledgers[key]
    if (!ledger) continue
    for (const { derivative } of Object.values(ledger)) {
      if (addressToTokenIds?.[derivative]) {
        derivativesAddressesOwned.push(derivative)
      }
    }
  }

  return derivativesAddressesOwned
}
