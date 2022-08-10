import {
  PostProcessingStore,
  processingPostStores,
} from 'stores/ProcessingPostsStore'
import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreatePostForm from 'components/CreatePostForm'
import PostProcessing from 'components/PostProcessing'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'
import WalletStore from 'stores/WalletStore'

function usePosts(
  postStatusStore: PostStatusStore,
  processingStore: PostProcessingStore
) {
  const { account } = useSnapshot(WalletStore)
  const { postsStatuses } = useSnapshot(postStatusStore)
  const { processingIds } = useSnapshot(processingStore)

  const accountProcessingPostIds = account && processingIds[account]
  const currentPostsStatuses = { ...postsStatuses }
  const currentPosts = accountProcessingPostIds
    ? accountProcessingPostIds.map(
        (tweetId) =>
          currentPostsStatuses[tweetId] || {
            tweetId,
            status: PostStatus.pending,
          }
      )
    : []

  const pendingPosts = currentPosts.filter(
    (post) => post.status === PostStatus.pending
  )

  const lastPublishedPost = currentPosts.find(
    (post) => post.status === PostStatus.published
  )

  return {
    pendingPosts,
    lastPublishedPost,
  }
}

type Post = {
  tweetId: number
  status: PostStatus
  statusId?: number | undefined
}

export default function () {
  const renderedPendingPosts: Post[] = []
  const renderedLastPublishedPosts: Post[] = []
  Object.values(processingPostStores).forEach((processingStore) => {
    const { pendingPosts, lastPublishedPost } = usePosts(
      processingStore.statusStore,
      processingStore
    )
    pendingPosts && renderedPendingPosts.push(...pendingPosts)
    lastPublishedPost && renderedLastPublishedPosts.push(lastPublishedPost)
  })

  const lastPublishedPost = renderedLastPublishedPosts[0]

  return (
    <div className={margin('mt-6', 'mb-16')}>
      <div className={space('space-y-6', 'md:space-y-12')}>
        {renderedPendingPosts.length > 0 ? (
          <PostProcessing
            post={renderedPendingPosts[0]}
            title={
              renderedPendingPosts.length > 1
                ? 'Your tweets are processing'
                : 'Your tweet is processing'
            }
          />
        ) : (
          lastPublishedPost && (
            <PostProcessing post={lastPublishedPost} title="Tweet successful" />
          )
        )}
        <CreatePostForm />
      </div>
    </div>
  )
}
