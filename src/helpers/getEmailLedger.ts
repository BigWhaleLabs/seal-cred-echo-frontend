import { SCEmailLedger } from '@big-whale-labs/seal-cred-ledger-contract'

interface EmailLedger {
  [domain: string]: {
    derivativeContract: string
    domain: string
  }
}

function getEmailLedgerRecord(derivativeContract: string, domain: string) {
  return {
    domain,
    derivativeContract,
  }
}

export default async function (ledger: SCEmailLedger): Promise<EmailLedger> {
  const eventsFilter = ledger.filters.CreateDerivativeContract()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce(
    (prev, { args: { domain, derivativeContract } }) => {
      return {
        ...prev,
        [domain]: getEmailLedgerRecord(derivativeContract, domain),
      }
    },
    {}
  )
  return result
}
