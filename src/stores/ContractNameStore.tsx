import { ContractNamesStore } from '@big-whale-labs/store-utils'
import { proxy } from 'valtio'
import env from 'helpers/env'

export default proxy(
  new ContractNamesStore([
    'requestedNames',
    'contractNames',
    'requestedSymbols',
    'contractSymbols',
  ])
).makePersistent(true, env.VITE_ENCRYPT_KEY)
