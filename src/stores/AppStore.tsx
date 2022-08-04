import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class AppStore extends PersistableStore {
  adultAccepted = false
  currentTwitterAccount = 'SealCredEmail'
}

export default proxy(new AppStore()).makePersistent()
