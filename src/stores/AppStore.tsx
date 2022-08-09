import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = 'SealCredEmail'
  currentTime = new Date().valueOf()
}

const appStoreProxy = proxy(new AppStore()).makePersistent(true)
setInterval(() => (appStoreProxy.currentTime = new Date().valueOf()), 10000)

export default appStoreProxy
