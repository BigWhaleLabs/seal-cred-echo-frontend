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
  const { lastUserPost } = useSnapshot(PostIdsStatuses)

  console.log('lastUserPost', lastUserPost)

  return (
    <div
      className={container(
        lastUserPost?.status === PostStatus.pending,
        !lastUserPost
      )}
    >
      {lastUserPost?.status === PostStatus.published ? (
        <TweetSuccessful tweetId={lastUserPost.tweetId} />
      ) : lastUserPost?.status === PostStatus.rejected ? (
        <PostRejected
          store={lastUserPost.store}
          blockchainId={lastUserPost.blockchainId}
        />
      ) : (
        <PendingPost pendingPost={lastUserPost} />
      )}
    </div>
  )
}
