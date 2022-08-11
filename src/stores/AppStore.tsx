import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import data from 'helpers/data'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = Object.values(data)[0].twitter
  currentTime = new Date().valueOf()
}

const appStoreProxy = proxy(new AppStore())
// .makePersistent()
setInterval(() => (appStoreProxy.currentTime = new Date().valueOf()), 10 * 1000)

export default appStoreProxy
