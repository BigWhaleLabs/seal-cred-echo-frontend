import { DataContractNames, data } from 'data'
import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

class SelectedTypeStore extends PersistableStore {
  selectedType = Object.keys(data)[0] as DataContractNames
}

export default proxy(new SelectedTypeStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
