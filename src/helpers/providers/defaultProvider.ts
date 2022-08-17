// import { ETH_RPC } from '@big-whale-labs/constants'
import { providers } from 'ethers'
import env from 'helpers/env'

// export default new providers.JsonRpcProvider(ETH_RPC, env.VITE_ETH_NETWORK)
export default env.VITE_ETH_RPC.includes('alchemy')
  ? new providers.AlchemyProvider(
      env.VITE_ETH_NETWORK,
      env.VITE_ETH_RPC.replace('https://eth-goerli.g.alchemy.com/v2/', '')
    )
  : new providers.JsonRpcProvider(env.VITE_ETH_RPC, env.VITE_ETH_NETWORK)
