export default interface Ledger {
  [address: string]: { original: string; derivative: string }
}
