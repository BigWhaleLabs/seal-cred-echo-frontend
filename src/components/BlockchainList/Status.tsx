import { StatusText } from 'components/Text'
import { useSnapshot } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStatusText from 'models/PostStatusText'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  padding,
} from 'classnames/tailwind'
import postIdsStatuses from 'stores/PostIdsStatuses'

const statusContainer = (status: PostStatus) =>
  classnames(
    display('flex'),
    alignItems('items-center'),
    padding('py-1', 'px-2'),
    borderRadius('rounded-lg'),
    backgroundColor({
      'bg-primary-dimmed':
        status === PostStatus.pending || status === PostStatus.approved,
      'bg-primary-background': status === PostStatus.published,
      'bg-error': status === PostStatus.rejected,
    })
  )

function StatusBadge({ id, status }: { id: number; status: PostStatus }) {
  return (
    <a href={`#blockchainTweetId=${id}`} className={statusContainer(status)}>
      <StatusText color={status === PostStatus.rejected ? 'dark' : 'default'}>
        {PostStatusText[status]}
      </StatusText>
    </a>
  )
}

export default function ({ id }: { id: number }) {
  const status = useSnapshot(postIdsStatuses).get(id)?.status

  return <StatusBadge id={id} status={status || PostStatus.pending} />
}
