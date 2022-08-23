import { useSnapshot } from 'valtio'
import PendingPost from 'components/PostProcessing/PendingPost'
import PostIdsStatuses, { LastUserPost } from 'stores/PostIdsStatuses'
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

const PostState = ({
  lastUserPost,
  accountName,
}: {
  lastUserPost: LastUserPost
  accountName: string
}) => {
  switch (lastUserPost.status) {
    case PostStatus.published:
      return (
        <TweetSuccessful
          accountName={accountName}
          tweetId={lastUserPost.tweetId}
        />
      )
    case PostStatus.rejected:
      return (
        <PostRejected
          store={lastUserPost.store}
          blockchainId={lastUserPost.blockchainId}
        />
      )
    default:
      return <PendingPost pendingPost={lastUserPost} />
  }
}

export default function () {
  const { lastUserPost } = useSnapshot(PostIdsStatuses)

  if (!lastUserPost) return null

  return (
    <div className={container(lastUserPost.status === PostStatus.pending)}>
      <PostState accountName={lastUserPost.store} lastUserPost={lastUserPost} />
    </div>
  )
}
