import { StatusText } from 'components/Text'
import classnames, {
  backgroundColor,
  borderRadius,
  padding,
} from 'classnames/tailwind'

const statusContainer = (status: StatusType) =>
  classnames(
    padding('py-1', 'px-2'),
    borderRadius('rounded-lg'),
    backgroundColor({
      'bg-primary-dimmed': status === 'pending',
      'bg-primary-background': status === 'posted',
      'bg-error': status === 'error',
    })
  )

type StatusType = 'pending' | 'posted' | 'error'

export default function ({
  text,
  status,
}: {
  text: string
  status: StatusType
}) {
  return (
    <div className={statusContainer(status)}>
      <StatusText dark={status === 'error'}>{text}</StatusText>
    </div>
  )
}
