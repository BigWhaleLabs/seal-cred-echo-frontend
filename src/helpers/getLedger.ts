import { Ledger as LedgerContract } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'

export default async function getLedger(ledgerContract: LedgerContract) {
  const eventsFilter = ledgerContract.filters.CreateDerivative()
  const events = await ledgerContract.queryFilter(eventsFilter)
  const ledger = {} as Ledger

  for (const event of events) {
    const [original, derivative] = event.args
    ledger[original] = { original, derivative }
  }

  return ledger
}
