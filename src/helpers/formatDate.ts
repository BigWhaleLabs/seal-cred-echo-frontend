import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function (rawDate: string | number, from: number): string {
  return typeof rawDate === 'number'
    ? dayjs.unix(rawDate).from(from)
    : dayjs(rawDate).from(from)
}
