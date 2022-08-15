import {
  SCPostStorage,
  SCPostStorage__factory,
} from '@big-whale-labs/seal-cred-posts-contract'
import data from 'data'
import defaultProvider from 'helpers/providers/defaultProvider'

export default Object.entries(data).reduce(
  (prev, [name, { postStorage }]) => ({
    ...prev,
    [name]: SCPostStorage__factory.connect(postStorage, defaultProvider),
  }),
  {}
) as { [name: string]: SCPostStorage }
