import { SCERC721Posts__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { Web3Provider } from '@ethersproject/providers'
import { utils } from 'ethers'
import TweetStructure from 'models/TweetStructure'
import env from 'helpers/env'

const transferEventInterface = new utils.Interface([
  `event TweetSaved(
    uint256 id,
    string tweet,
    address indexed derivativeAddress,
    address indexed sender,
    uint256 timestamp
  )`,
])

export function parseTweetSavedLogData({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export default async function (
  { tweet, domain }: TweetStructure,
  provider: Web3Provider
) {
  if (!tweet) throw new Error('Invalid tweet')
  if (!domain) throw new Error('Invalid domain')

  const ledger = SCERC721Posts__factory.connect(
    env.VITE_SC_ERC721_POSTS_CONTRACT,
    provider.getSigner(0)
  )

  const tx = await ledger.savePost(tweet, domain)
  return tx.wait()
}
