import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

class NotificationStore extends PersistableStore {
  showCookie = true
  adultAccepted = false
}

export default proxy(new NotificationStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
