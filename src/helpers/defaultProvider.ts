import { ETH_RPC } from '@big-whale-labs/constants'
import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import { providers } from 'ethers'
import env from 'helpers/env'

const ethersProvider = new providers.JsonRpcProvider(
  ETH_RPC,
  env.VITE_ETH_NETWORK
)

const web3provider = new WrapBridge(
  new Eip1193Bridge(ethersProvider.getSigner(), ethersProvider)
)

const provider = await RelayProvider.newProvider({
  provider: web3provider,
  config: {
    paymasterAddress: '0x16666013bAa8B242437ADD7f846897B3B2AF713D',
  },
}).init()

export default provider
