import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'

export default function () {
  const { addressToTokenIds } = useSnapshot(ContractsStore)

  if (!addressToTokenIds) return []

  return Object.keys(addressToTokenIds)
}
