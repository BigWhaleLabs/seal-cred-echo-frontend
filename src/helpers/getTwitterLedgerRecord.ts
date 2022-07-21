import { BigNumber } from 'ethers'

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
  }
}
