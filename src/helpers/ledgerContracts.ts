import {
  Ledger,
  Ledger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { data } from 'data'
import defaultProvider from 'helpers/providers/defaultProvider'

export default Object.entries(data).reduce(
  (prev, [name, { ledger }]) => ({
    ...prev,
    [name]: Ledger__factory.connect(ledger, defaultProvider),
  }),
  {}
) as { [name: string]: Ledger }
