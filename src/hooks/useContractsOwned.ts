import { useSnapshot } from 'valtio'
import ContractsStoreClass from 'stores/ContractStore'

export default function (store: ContractsStoreClass) {
  const { addressToTokenIds } = useSnapshot(store)

  if (!addressToTokenIds) return []

  return Object.keys(addressToTokenIds)
}
