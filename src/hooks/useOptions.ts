import { useSnapshot } from 'valtio'
import Ledger from 'models/Ledger'
import SealCredStore from 'stores/SealCredStore'
import useContractsOwned from 'hooks/useContractsOwned'

function makeOptions(ledgerRecord: Ledger, addresses: string[]) {
  return Object.entries(ledgerRecord).map(([original, { address }]) => {
    if (!addresses.includes(address)) return
    return {
      label: address,
      value: { original, derivative: address },
    }
  })
}

export default function () {
  const { ledgers } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()

  return Object.values(ledgers).map((ledgerRecord) =>
    makeOptions(ledgerRecord, contractsOwned)
  )
}
