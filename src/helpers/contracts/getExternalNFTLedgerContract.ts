import { Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return Ledger__factory.connect(
    env.VITE_SC_EXTERNAL_NFT_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}
