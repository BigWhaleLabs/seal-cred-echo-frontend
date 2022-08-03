import { SCERC721Posts__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCERC721Posts__factory.connect(
    env.VITE_SC_EMAIL_POSTS_CONTRACT,
    provider
  )
}
