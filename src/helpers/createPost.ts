import { PostERC721Structure, PostEmailStructure } from 'models/TweetStructure'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { Web3Provider } from '@ethersproject/providers'
import { utils } from 'ethers'
import env from 'helpers/env'

const transferEventInterface = new utils.Interface([
  `event PostSaved(
    uint256 id,
    string post,
    address indexed derivativeAddress,
    address indexed sender,
    uint256 timestamp
  )`,
])

export function parsePostSavedLogData({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export async function createERC721Post(
  { post, originalContract }: PostERC721Structure,
  provider: Web3Provider
) {
  if (!post) throw new Error('Invalid post')
  if (!originalContract) throw new Error('Invalid originalContract')

  const storage = SCPostStorage__factory.connect(
    env.VITE_SC_POST_STORAGE_CONTRACT,
    provider.getSigner(0)
  )

  const tx = await storage.savePost(post, originalContract)

  return tx.wait()
}

export async function createEmailPost(
  { post, domain }: PostEmailStructure,
  provider: Web3Provider
) {
  if (!post) throw new Error('Invalid post')
  if (!domain) throw new Error('Invalid symbol')

  const storage = SCPostStorage__factory.connect(
    env.VITE_SC_POST_STORAGE_CONTRACT,
    provider.getSigner(0)
  )

  const tx = await storage.savePost(post, domain)

  return tx.wait()
}
