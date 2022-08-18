import { useSnapshot } from 'valtio'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostPending from 'components/PostProcessing/PostPending'
import PostRejected from 'components/PostProcessing/PostRejected'
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
  const { pendingPost, rejectedPost, lastProcessedStatusId } =
    useSnapshot(PostIdsStatuses)

  if (!pendingPost && !lastProcessedStatusId && !rejectedPost) return null

  return (
    <div className={container(!!pendingPost)}>
      {lastProcessedStatusId ? (
        <TweetSuccessful statusId={lastProcessedStatusId} />
      ) : pendingPost ? (
        <PostPending
          blockchainLink={`/tweets/blockchain#store=${pendingPost.store}&id=${pendingPost.id}`}
        />
      ) : rejectedPost ? (
        <PostRejected
          blockchainLink={`/tweets/blockchain#store=${rejectedPost.store}&id=${rejectedPost.id}`}
        />
      ) : null}
    </div>
  )
}
