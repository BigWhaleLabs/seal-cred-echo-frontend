import { EnsStore as EnsClass } from '@big-whale-labs/store-utils'
import { proxy } from 'valtio'
import defaultProvider from 'helpers/providers/defaultProvider'

const EnsStore = proxy(new EnsClass(defaultProvider))

export default EnsStore
