import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  try {
    return (await contract.getAllPosts())
      .map(
        ([id, post, derivativeAddress, sender, timestamp]) =>
          ({
            id,
            post,
            derivativeAddress,
            sender,
            timestamp,
          } as PostStructOutput)
      )
      .reverse()
  } catch {
    return []
  }
}
