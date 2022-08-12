import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreatePostForm from 'components/CreatePostForm'
import PostProcessing from 'components/PostProcessing'
import PostStatus from 'models/PostStatus'
import data from 'data'
import postStore, { PostStructWithStatuses } from 'stores/PostStore'

function getPendingPosts(storageName: string) {
  const postList = useSnapshot(postStore.postStorages)[storageName]
  if (!postList) return []

  return postList.filter((post) => {
    post.state.status === PostStatus.pending
  })
}

export default function () {
  const pendingPosts: PostStructWithStatuses[] = []
  Object.keys(data).forEach((storageName) => {
    pendingPosts.push(...getPendingPosts(storageName))
  })
  let lastPublishedPost: PostStructWithStatuses | undefined

  // TODO: put current user pending posts at the top

  return (
    <div className={margin('mt-6', 'mb-16')}>
      <div className={space('space-y-6', 'md:space-y-12')}>
        {pendingPosts.length > 0 ? (
          <PostProcessing
            post={pendingPosts[0]}
            title={
              pendingPosts.length > 1
                ? 'Your tweets are processing'
                : 'Your tweet is processing'
            }
          />
        ) : (
          lastPublishedPost && (
            <PostProcessing post={lastPublishedPost} title="Tweet successful" />
          )
        )}
        {/* <CreatePostForm /> */}
      </div>
    </div>
  )
}
