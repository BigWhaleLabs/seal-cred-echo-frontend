import { BigNumber } from 'ethers'

export default function (
  id: BigNumber,
  tweet: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  return {
    id: id.toNumber(),
    tweet,
    derivativeAddress,
    sender,
    timestamp: timestamp.toNumber(),
  }
}
