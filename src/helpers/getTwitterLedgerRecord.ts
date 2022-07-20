import { BigNumber } from 'ethers'
import TweetStatus from 'models/TweetStatus'

export default function (
  id: number,
  tweet: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  return {
    id,
    tweet,
    derivativeAddress,
    sender,
    timestamp: timestamp.toNumber(),
    status: TweetStatus.pending,
  }
}
