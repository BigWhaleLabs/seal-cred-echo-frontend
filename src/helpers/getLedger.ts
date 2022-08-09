import { Ledger as LedgerContract } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'

export default async function (ledger: LedgerContract) {
  const eventsFilter = ledger.filters.CreateDerivative()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce((prev, { args: { original, derivative } }) => {
    return {
      ...prev,
      [original]: derivative,
    }
  }, {})
  return result as Ledger
}
