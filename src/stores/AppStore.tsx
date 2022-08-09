import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = 'SealCredEmail'
  currentTime = new Date().valueOf()
}

const appStoreProxy = proxy(new AppStore()).makePersistent(true)
setInterval(() => (appStoreProxy.currentTime = new Date().valueOf()), 10000)

export default appStoreProxy
