import { StatusText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import formatDate from 'helpers/formatDate'

export default function ({ timestamp }: { timestamp: number }) {
  const { currentTime } = useSnapshot(AppStore)
  const formatted = formatDate(timestamp, currentTime)

  return <StatusText textRight>{formatted}</StatusText>
}
