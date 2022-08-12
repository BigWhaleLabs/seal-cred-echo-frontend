import { BigNumber } from 'ethers'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function (rawDate: BigNumber, from: number): string {
  return dayjs.unix(rawDate.toNumber()).from(from)
}
