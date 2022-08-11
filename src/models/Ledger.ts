export default interface Ledger {
  [original: string]: string
}

export interface LedgerWithName {
  [ledgerName: string]: Ledger
}
