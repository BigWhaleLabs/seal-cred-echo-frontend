import {
  SCPostStorage,
  SCPostStorage__factory,
} from '@big-whale-labs/seal-cred-posts-contract'
import data from 'data'
import defaultProvider from 'helpers/providers/defaultProvider'

export default Object.entries(data).reduce(
  (prev, [name, { ledger }]) => ({
    ...prev,
    [name]: SCPostStorage__factory.connect(ledger, defaultProvider),
  }),
  {}
) as { [name: string]: SCPostStorage }
