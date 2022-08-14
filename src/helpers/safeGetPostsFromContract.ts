import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  console.log('safeGetPostsFromContract', contract.address)
  try {
    return await contract.getAllPosts()
  } catch {
    return []
  }
}
