import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  try {
    return Number(await contract.currentPostId())
  } catch (error) {
    console.error('Error occurred while running "currentPostId()"', error)
    return 0
  }
}
