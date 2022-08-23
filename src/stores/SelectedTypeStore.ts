import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import DataKeys from 'models/DataKeys'
import data from 'data'
import env from 'helpers/env'

class SelectedTypeStore extends PersistableStore {
  selectedType = Object.keys(data)[0] as DataKeys
}

export default proxy(new SelectedTypeStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
