import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import data from 'data'
import env from 'helpers/env'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = Object.values(data)[0].twitter
}

export default proxy(new AppStore()).makePersistent(env.VITE_ENCRYPT_KEY)
