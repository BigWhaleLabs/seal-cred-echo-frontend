import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import defaultProvider from 'helpers/defaultProvider'

export default await RelayProvider.newProvider({
  provider: new WrapBridge(
    new Eip1193Bridge(defaultProvider.getSigner(), defaultProvider)
  ),
  config: {
    paymasterAddress: '0xD6bB542f9240ecbACE7CC1a91A4E7C9D302837Cb',
  },
}).init()
