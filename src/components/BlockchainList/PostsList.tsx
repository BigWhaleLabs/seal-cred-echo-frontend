import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

function BlockchainPostsListSuspended() {
  const { selectedPosts, selectedToken } = useSnapshot(PostStore)
  useScrollToAnchor()

  return (
    <>
      {selectedPosts.length ? (
        selectedPosts
          .filter((post) =>
            selectedToken ? post.derivativeAddress === selectedToken : post
          )
          .map((post) => (
            <BlockchainPost
              key={post.id}
              blockchainId={Number(post.id)}
              timestamp={Number(post.timestamp)}
              text={post.post}
              sender={post.sender}
              derivativeAddress={post.derivativeAddress}
            />
          ))
      ) : (
        <NoPosts />
      )}
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
