import { providers } from 'ethers'
import env from 'helpers/env'

export default env.VITE_ETH_RPC.includes('alchemy')
  ? new providers.AlchemyProvider(
      env.VITE_ETH_NETWORK,
      '2NIFGDfsbi0nZrv5_SJVNGFK-NXhAhty'
    )
  : new providers.JsonRpcProvider(env.VITE_ETH_RPC, env.VITE_ETH_NETWORK)
