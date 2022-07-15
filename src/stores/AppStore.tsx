import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class AppStore extends PersistableStore {
  adultAccepted = false
}

export default proxy(new AppStore()).makePersistent()
