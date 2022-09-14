import { StatusText } from 'components/Text'
import { useSnapshot } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStatusText from 'models/PostStatusText'
import SelectedTypeStore from 'stores/SelectedTypeStore'
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

export default function ({ blockchainId }: { blockchainId: number }) {
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const { currentStatuses } = useSnapshot(postIdsStatuses)
  const status = currentStatuses[blockchainId]?.status

  return (
    <a
      href={`#store=${selectedType}&id=${blockchainId}`}
      className={statusContainer(status || PostStatus.pending)}
    >
      <StatusText color={status === PostStatus.rejected ? 'dark' : 'default'}>
        {PostStatusText[status] || 'Loading...'}
      </StatusText>
    </a>
  )
}
