import { BigNumber } from 'ethers'
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
import postStore from 'stores/PostStore'
import usePostStorageKey from 'hooks/usePostStorageKey'

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

function Status({ id }: { id: BigNumber }) {
  const storageKey = usePostStorageKey()
  const { idsToStatuses } = useSnapshot(postStore)

  const status =
    (storageKey &&
      idsToStatuses[storageKey] &&
      idsToStatuses[storageKey][id.toNumber()]?.status) ||
    PostStatus.pending

  return (
    <a href={`#blockchainTweetId=${id}`} className={statusContainer(status)}>
      <StatusText color={status === PostStatus.rejected ? 'dark' : 'default'}>
        {PostStatusText[status]}
      </StatusText>
    </a>
  )
}

export default function ({ id }: { id: BigNumber }) {
  return (
    <Suspense
      fallback={
        <StatusText color={status === PostStatus.rejected ? 'dark' : 'default'}>
          {PostStatus.pending}
        </StatusText>
      }
    >
      <Status id={id} />
    </Suspense>
  )
}
