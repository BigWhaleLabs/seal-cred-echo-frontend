import { state } from 'stores/SealCredStore'
import { useSnapshot } from 'valtio'
import Ledger from 'models/Ledger'
import PostConstructor from 'helpers/PostConstructor'
import useContractsOwned from 'hooks/useContractsOwned'

function makeOptions<T>(
  ledgerRecord: Ledger,
  addresses: string[],
  createValue: ({
    original,
    derivative,
  }: {
    original: string
    derivative: string
  }) => T
) {
  return Object.keys(ledgerRecord)
    .filter((original) => addresses.includes(ledgerRecord[original]))
    .map((original) => ({
      label: ledgerRecord[original],
      value: createValue({ original, derivative: ledgerRecord[original] }),
    }))
}

export default function () {
  // TODO: lets hope using state is valid
  const stores = useSnapshot(state)
  console.log(stores)
  const contractsOwned = useContractsOwned()

  const options: {
    label: string
    value: { original: string; derivative: string }
  }[] = []

  Object.values(stores).forEach((ledger) => {
    makeOptions(
      ledger,
      contractsOwned,
      ({ original, derivative }) => new PostConstructor(original, derivative)
    )
  })

  return options
}
