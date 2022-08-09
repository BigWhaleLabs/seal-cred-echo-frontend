import { Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import data from 'helpers/data'
import defaultProvider from 'helpers/providers/defaultProvider'

export default Object.entries(data).reduce(
  (acc, [name, { ledger, postStorage }]) => ({
    ...acc,
    [name]: {
      ledger: Ledger__factory.connect(ledger, defaultProvider),
      postStorage: SCPostStorage__factory.connect(postStorage, defaultProvider),
    },
  }),
  {}
)
