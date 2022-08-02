import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import defaultProvider from 'helpers/defaultProvider'

export default await RelayProvider.newProvider({
  provider: new WrapBridge(
    new Eip1193Bridge(defaultProvider.getSigner(), defaultProvider)
  ),
  config: {
    paymasterAddress: '0x16666013bAa8B242437ADD7f846897B3B2AF713D',
  },
}).init()
