import { ENSStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import defaultProvider from 'helpers/providers/defaultProvider'

const proxifiedENSStore = proxy(new ENSStore(defaultProvider))

export default proxifiedENSStore
