import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCPostStorage__factory.connect(
    env.VITE_SC_POST_STORAGE_CONTRACT,
    provider
  )
}
