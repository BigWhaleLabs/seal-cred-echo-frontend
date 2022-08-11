import { SelectOption } from 'models/SelectOption'
import { state } from 'stores/SealCredStore'
import { useSnapshot } from 'valtio'
import Ledger, { LedgerWithName } from 'models/Ledger'
import useContractsOwned from 'hooks/useContractsOwned'

function makeOptions(ledger: Ledger, ledgerName: string, addresses: string[]) {
  return Object.keys(ledger)
    .filter((derivative) => addresses.includes(derivative))
    .map((original) => ({
      label: ledger[original],
      value: { [ledgerName]: ledger },
    }))
}

export default function () {
  // TODO: lets hope using state is valid
  const stores = useSnapshot(state)
  const contractsOwned = useContractsOwned()

  const options: SelectOption<LedgerWithName>[] = []

  Object.keys(stores).forEach((ledgerName) => {
    // eslint-disable-next-line valtio/state-snapshot-rule
    options.push(...makeOptions(stores[ledgerName], ledgerName, contractsOwned))
  })

  return options
}
