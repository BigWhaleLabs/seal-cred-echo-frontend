import { Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import defaultProvider from 'helpers/providers/defaultProvider'

export default function (address: string) {
  return Ledger__factory.connect(address, defaultProvider)
}
