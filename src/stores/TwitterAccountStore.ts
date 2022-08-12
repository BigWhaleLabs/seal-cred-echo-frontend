import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import data from 'data'
import env from 'helpers/env'

class TwitterAccountStore extends PersistableStore {
  currentTwitterAccount = Object.values(data)[0].twitter
}

export default proxy(new TwitterAccountStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
