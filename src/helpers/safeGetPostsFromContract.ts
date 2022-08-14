import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  try {
    return await contract.getAllPosts()
  } catch {
    return []
  }
}
