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

export default function ({
  id,
  statusStore,
}: {
  id: number
  statusStore: PostStatusStore
}) {
  const { postsStatuses } = useSnapshot(statusStore)
  const post = postsStatuses[id]
  const status = post?.status || PostStatus.pending

  return (
    <a href={`#blockchainTweetId=${id}`} className={statusContainer(status)}>
      <StatusText color={status === PostStatus.rejected ? 'dark' : 'default'}>
        {PostStatusText[status]}
      </StatusText>
    </a>
  )
}
