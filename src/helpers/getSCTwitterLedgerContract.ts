import { SealCredTwitter__factory } from '@big-whale-labs/seal-cred-twitter-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SealCredTwitter__factory.connect(
    env.VITE_SC_TWITTER_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}
