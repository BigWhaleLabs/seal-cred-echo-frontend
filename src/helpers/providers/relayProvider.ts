import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'

export default await RelayProvider.newProvider({
  provider: new WrapBridge(
    new Eip1193Bridge(defaultProvider.getSigner(), defaultProvider)
  ),
  config: {
    paymasterAddress: env.VITE_PAYMASTER_CONTRACT,
  },
}).init()
