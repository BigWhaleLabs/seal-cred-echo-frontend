import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'

function BlockchainPostsListSuspended() {
  const { postStorages } = useSnapshot(PostStore)
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const posts = postStorages[selectedType]
  console.log(posts)

  return (
    <>
      {!posts.length && <NoPosts />}
      {posts.map((post) => (
        <BlockchainPost
          key={`${post.id}`}
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
