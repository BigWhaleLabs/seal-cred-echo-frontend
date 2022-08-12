import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = 'SealCredEmail'
}

export default proxy(new AppStore()).makePersistent(env.VITE_ENCRYPT_KEY)
