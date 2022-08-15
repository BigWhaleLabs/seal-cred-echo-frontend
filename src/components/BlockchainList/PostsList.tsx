import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'

function usePosts() {
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const { postStorages } = useSnapshot(PostStore)

  if (!postStorages[selectedType]) {
    PostStore.fetchPostsByName(selectedType)
    return []
  }

  return [...postStorages[selectedType]]
}

function BlockchainPostsListSuspended() {
  const posts = usePosts()

  return (
    <>
      {!posts.length && <NoPosts />}
      {posts.map((post) => (
        <BlockchainPost
          key={`${post.id}`}
          id={Number(post.id)}
          timestamp={Number(post.timestamp)}
          text={post.post}
          sender={post.sender}
          derivativeAddress={post.derivativeAddress}
        />
      ))}
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<ListLoading text="Fetching blockchain posts..." />}>
      <BlockchainPostsListSuspended />
    </Suspense>
  )
}
