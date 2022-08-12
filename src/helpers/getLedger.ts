import {
  Derivative__factory,
  Ledger as LedgerContract,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'

export default async function getLedger(ledgerContract: LedgerContract) {
  const eventsFilter = ledgerContract.filters.CreateDerivative()
  const events = await ledgerContract.queryFilter(eventsFilter)
  const ledger: Ledger = {}
  const originalToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const [original, derivative] = event.args
    originalToDerivative[original] = derivative
  }

  for (const original in originalToDerivative) {
    ledger[original] = Derivative__factory.connect(
      originalToDerivative[original],
      ledgerContract.provider
    )
  }
  return ledger
}
