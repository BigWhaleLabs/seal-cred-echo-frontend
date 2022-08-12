import { providers } from 'ethers'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'

export default env.VITE_ETH_RPC.includes('alchemy')
  ? new providers.AlchemyProvider(
      env.VITE_ETH_NETWORK,
      env.VITE_ETH_RPC.replace('https://eth-goerli.g.alchemy.com/v2/', '')
    )
  : defaultProvider
