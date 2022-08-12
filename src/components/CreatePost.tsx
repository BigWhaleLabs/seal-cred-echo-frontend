import { PostStruct } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CreatePostForm from 'components/CreatePostForm'
import PostProcessing from 'components/PostProcessing'
import PostStatus from 'models/PostStatus'
import WalletStore from 'stores/WalletStore'
import data from 'data'
import postStore from 'stores/PostStore'

function getPosts() {
  const pendingPosts: PostStruct[] = []
  let lastPublishedPost: PostStruct | undefined = undefined

  Object.keys(data).forEach((contractName) => {
    const posts = useSnapshot(postStore.postStorages)[contractName]

    posts.forEach((post) => {
      const status = useSnapshot(postStore.idsToStatuses)[contractName][
        Number(post.id)
      ]
      if (!status) return

      const isPostSender = post.sender === WalletStore.account

      if (isPostSender && status.status === PostStatus.pending)
        return pendingPosts.push(post)

      if (isPostSender && status.status === PostStatus.published)
        lastPublishedPost = post
    })
  })

  return {
    pendingPosts,
    lastPublishedPost,
  }
}

export default function () {
  const { pendingPosts, lastPublishedPost } = getPosts()

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
        <CreatePostForm />
      </div>
    </div>
  )
}
