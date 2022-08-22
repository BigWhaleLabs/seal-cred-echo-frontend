import { useSnapshot } from 'valtio'
import PendingPost from 'components/PostProcessing/PendingPost'
import PostIdsStatuses from 'stores/PostIdsStatuses'
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

const container = (loading?: boolean, hidden?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    backgroundColor('bg-primary-background'),
    padding('py-6', 'px-9'),
    borderRadius('rounded-2xl'),
    space(loading ? 'space-y-6' : 'space-y-2'),
    display({ hidden })
  )

export default function () {
  const { pendingPost, lastProcessedUserPost } = useSnapshot(PostIdsStatuses)

  console.log('lastUserPost', lastProcessedUserPost)
  const hideBlock = !pendingPost && !lastProcessedUserPost

  return (
    <div className={container(!!pendingPost, hideBlock)}>
      {lastProcessedUserPost?.postStatus.status === PostStatus.published ? (
        <TweetSuccessful statusId={lastProcessedUserPost.postStatus.statusId} />
      ) : lastProcessedUserPost?.postStatus.status === PostStatus.rejected ? (
        <PostRejected
          store={lastProcessedUserPost.store}
          statusId={lastProcessedUserPost.postStatus.statusId}
        />
      ) : (
        pendingPost && <PendingPost pendingPost={pendingPost} />
      )}
    </div>
  )
}
