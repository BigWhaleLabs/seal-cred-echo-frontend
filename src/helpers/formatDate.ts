import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function (rawDate: string | number): string {
  return typeof rawDate === 'number'
    ? dayjs.unix(rawDate).fromNow()
    : dayjs(rawDate).fromNow()
}
