import { useSnapshot } from 'valtio'
import PendingPost from 'components/PostProcessing/PendingPost'
import PostIdsStatuses, { LastUserPostData } from 'stores/PostIdsStatuses'
import PostRejected from 'components/PostProcessing/PostRejected'
import PostStatus from 'models/PostStatus'
import TweetSuccessful from 'components/PostProcessing/TweetSuccessful'
import WalletStore from 'stores/WalletStore'
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
  lastUserPostData,
}: {
  lastUserPostData: LastUserPostData
}) => {
  const storeName = lastUserPostData.store

  switch (lastUserPostData.status) {
    case PostStatus.published:
      return (
        <TweetSuccessful
          storeName={storeName}
          tweetId={lastUserPostData.tweetId}
        />
      )
    case PostStatus.rejected:
      return (
        <PostRejected
          store={lastUserPostData.store}
          blockchainId={lastUserPostData.blockchainId}
        />
      )
    default:
      return <PendingPost pendingPost={lastUserPostData} />
  }
}

export default function () {
  const { lastUserPost } = useSnapshot(PostIdsStatuses)
  const { account } = useSnapshot(WalletStore)

  if (!account || !lastUserPost || !lastUserPost[account]) return null

  const lastUserPostData = lastUserPost[account]

  return (
    <div className={container(lastUserPostData.status === PostStatus.pending)}>
      <PostState lastUserPostData={lastUserPostData} />
    </div>
  )
}
