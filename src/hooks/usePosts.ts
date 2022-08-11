import { postStores } from 'stores/PostStore'
import PostModel from 'models/Post'
import PostStatusStore, { postStatusStores } from 'stores/PostStatusStore'

export default function () {
  const allPosts: { post: PostModel; statusStore: PostStatusStore }[] = []

  Object.keys(postStores).map(async (ledgerName) => {
    const postStore = postStores[ledgerName]
    const posts = await postStore.posts
    posts.forEach((post) => {
      allPosts.push({ post, statusStore: postStatusStores[ledgerName] })
    })
  })

  return allPosts.sort((a, b) => b.post.timestamp - a.post.timestamp)
}
