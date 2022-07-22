import { StatusText } from 'components/Text'
import TweetStatus from 'models/TweetStatus'
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
      'bg-primary-dimmed': status === TweetStatus.pending,
      'bg-primary-background': status === TweetStatus.approved,
      'bg-error': status === TweetStatus.rejected,
    })
  )

export default function ({ status }: { status: TweetStatus }) {
  return (
    <div className={statusContainer(status)}>
      <StatusText dark={status === TweetStatus.rejected}>
        {TweetStatusText[status]}
      </StatusText>
    </div>
  )
}
