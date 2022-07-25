import { StatusText } from 'components/Text'
import { useSnapshot } from 'valtio'
import TweetStatus from 'models/TweetStatus'
import TweetStatusStore from 'stores/TweetStatusStore'
import TweetStatusText from 'models/TweetStatusText'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  padding,
} from 'classnames/tailwind'

const statusContainer = (status: TweetStatus) =>
  classnames(
    display('flex'),
    alignItems('items-center'),
    padding('py-1', 'px-2'),
    borderRadius('rounded-lg'),
    backgroundColor({
      'bg-primary-dimmed':
        status === TweetStatus.pending || status === TweetStatus.approved,
      'bg-primary-background': status === TweetStatus.published,
      'bg-error': status === TweetStatus.rejected,
    })
  )

export default function ({ id }: { id: number }) {
  const { tweetsStatuses } = useSnapshot(TweetStatusStore)
  const tweet = tweetsStatuses[id]
  const status = tweet?.status || TweetStatus.pending

  return (
    <a href={`#blockchainTweetId=${id}`} className={statusContainer(status)}>
      <StatusText dark={status === TweetStatus.rejected}>
        {TweetStatusText[status]}
      </StatusText>
    </a>
  )
}
