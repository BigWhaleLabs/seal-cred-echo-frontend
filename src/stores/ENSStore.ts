import { ENSStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import defaultProvider from 'helpers/providers/defaultProvider'

export default proxy(new ENSStore(defaultProvider))
