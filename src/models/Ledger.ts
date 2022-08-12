import { Derivative } from '@big-whale-labs/seal-cred-ledger-contract'

export default interface Ledger {
  [address: string]: Derivative
}
