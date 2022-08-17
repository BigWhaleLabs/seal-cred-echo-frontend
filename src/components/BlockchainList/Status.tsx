import { StatusText } from 'components/Text'
import { Suspense } from 'preact/compat'
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

export function StatusSuspended({ id }: { id: number }) {
  const status = useSnapshot(postIdsStatuses).currentStatuses[id]?.status

  return (
    <a href={`#blockchainTweetId=${id}`} className={statusContainer(status)}>
      <StatusText color={status === PostStatus.rejected ? 'dark' : 'default'}>
        {PostStatusText[status]}
      </StatusText>
    </a>
  )
}

export default function ({ id }: { id: number }) {
  return (
    <Suspense
      fallback={
        <div className={statusContainer(PostStatus.pending)}>
          <StatusText color={'default'}>
            <span className="dots-loading">Loading...</span>
          </StatusText>
        </div>
      }
    >
      <StatusSuspended id={id} />
    </Suspense>
  )
}
