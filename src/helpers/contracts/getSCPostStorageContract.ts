import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { providers } from 'ethers'

export default function (
  address: string,
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCPostStorage__factory.connect(address, provider)
}
