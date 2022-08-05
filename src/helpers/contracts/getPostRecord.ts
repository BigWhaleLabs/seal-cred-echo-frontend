import { BigNumber } from 'ethers'

export default function (
  id: BigNumber,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  return {
    id: id.toNumber(),
    post,
    derivativeAddress,
    sender,
    timestamp: timestamp.toNumber(),
  }
}
