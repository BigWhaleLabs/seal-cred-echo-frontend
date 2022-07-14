import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function formatDate(rawDate: string): string {
  return dayjs(rawDate).fromNow()
}
