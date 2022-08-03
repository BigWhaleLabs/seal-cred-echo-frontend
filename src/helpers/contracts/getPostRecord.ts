import { BigNumber } from 'ethers'

export default function (
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  return {
    id,
    post,
    derivativeAddress,
    sender,
    timestamp: timestamp.toNumber(),
  }
}
