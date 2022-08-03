import { SCEmailLedger } from '@big-whale-labs/seal-cred-ledger-contract'

function getEmailLedgerRecord(derivativeContract: string, domain: string) {
  return {
    domain,
    derivativeContract,
  }
}

export default async function (ledger: SCEmailLedger) {
  const eventsFilter = ledger.filters.CreateDerivativeContract()
  const events = await ledger.queryFilter(eventsFilter)
  const emailLedger = events.reduce(
    (prev, { args: { domain, derivativeContract } }) => {
      return {
        ...prev,
        [domain]: getEmailLedgerRecord(derivativeContract, domain),
      }
    },
    {}
  )
  return emailLedger
}