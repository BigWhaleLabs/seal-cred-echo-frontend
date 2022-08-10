/* eslint-disable valtio/state-snapshot-rule */
import { postStores } from 'stores/PostStore'
import { useSnapshot } from 'valtio'
import PostModel from 'models/Post'

import PostStatusStore, { postStatusStores } from 'stores/PostStatusStore'
export default function () {
  const allPosts: { post: PostModel; statusStore: PostStatusStore }[] = []

  Object.keys(postStores).map((ledgerName) => {
    const postStore = postStores[ledgerName]
    const { posts } = useSnapshot(postStore)
    // TODO: probably breaks valtio
    posts.forEach((post) => {
      allPosts.push({ post, statusStore: postStatusStores[ledgerName] })
    })
  })

  return allPosts.sort((a, b) => b.post.timestamp - a.post.timestamp)
}
