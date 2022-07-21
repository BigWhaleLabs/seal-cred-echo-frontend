import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractStore'

export default function () {
  const { addressToTokenIds } = useSnapshot(ContractsStore)

  if (!addressToTokenIds) return []

  return Object.keys(addressToTokenIds)
}
