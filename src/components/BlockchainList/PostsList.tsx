import { FixedSizeList } from 'react-window'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

function BlockchainPostsListSuspended() {
  const { selectedPosts } = useSnapshot(PostStore)
  useScrollToAnchor()

  const data = selectedPosts.filter((post) =>
    PostStore.selectedToken
      ? post.derivativeAddress === PostStore.selectedToken
      : post
  )

  const Row = ({ index }: { index: number }) => {
    const post = data[index]

    return (
      <BlockchainPost
        key={post.id}
        id={Number(post.id)}
        timestamp={Number(post.timestamp)}
        text={post.post}
        sender={post.sender}
        derivativeAddress={post.derivativeAddress}
      />
    )
  }

  return (
    <>
      {data.length ? (
        <FixedSizeList
          width={565}
          height={700}
          itemSize={300}
          itemCount={data.length}
        >
          {Row}
        </FixedSizeList>
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
