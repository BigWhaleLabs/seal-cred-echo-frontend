import { PersistableStore } from '@big-whale-labs/store-utils'
import { proxy } from 'valtio'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = 'SealCredEmail'
}

export default proxy(new AppStore()).makePersistent()
