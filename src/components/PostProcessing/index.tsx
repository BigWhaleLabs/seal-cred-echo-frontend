import { useSnapshot } from 'valtio'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostPending from 'components/PostProcessing/PostPending'
import PostRejected from 'components/PostProcessing/PostRejected'
import PostStatus from 'models/PostStatus'
import TweetSuccessful from 'components/PostProcessing/TweetSuccessful'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  padding,
  space,
} from 'classnames/tailwind'

const container = (loading?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    backgroundColor('bg-primary-background'),
    padding('py-6', 'px-9'),
    borderRadius('rounded-2xl'),
    space(loading ? 'space-y-6' : 'space-y-2')
  )

export default function () {
  const { lastPostWithStatus } = useSnapshot(PostIdsStatuses)
  if (!lastPostWithStatus) return null

  const { status, statusId } = lastPostWithStatus.statusWithId
  const blockchainLink = `/tweets/blockchain#store=${lastPostWithStatus.storeName}&id=${lastPostWithStatus.id}`

  return (
    <div className={container(!!lastPostWithStatus)}>
      {status === PostStatus.published && statusId ? (
        <TweetSuccessful statusId={statusId} />
      ) : status === PostStatus.rejected ? (
        <PostRejected blockchainLink={blockchainLink} />
      ) : (
        <PostPending blockchainLink={blockchainLink} />
      )}
    </div>
  )
}
