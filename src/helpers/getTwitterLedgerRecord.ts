import { BigNumber } from 'ethers'

export default function (
  id: BigNumber,
  tweet: string,
  derivativeAddress: string,
  updatedAt: number
) {
  return {
    id: id.toNumber(),
    tweet,
    derivativeAddress,
    updatedAt,
  }
}
