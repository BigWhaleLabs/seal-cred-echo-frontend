import { StatusText } from 'components/Text'
import TweetStatus from 'models/TweetStatus'
import classnames, {
  backgroundColor,
  borderRadius,
  padding,
} from 'classnames/tailwind'

const statusContainer = (status: TweetStatus) =>
  classnames(
    padding('py-1', 'px-2'),
    borderRadius('rounded-lg'),
    backgroundColor({
      'bg-primary-dimmed': status === TweetStatus.pending,
      'bg-primary-background': status === TweetStatus.posted,
      'bg-error': status === TweetStatus.rejected,
    })
  )

export default function ({
  text,
  status,
}: {
  text: string
  status: TweetStatus
}) {
  return (
    <div className={statusContainer(status)}>
      <StatusText dark={status === TweetStatus.rejected}>{text}</StatusText>
    </div>
  )
}
