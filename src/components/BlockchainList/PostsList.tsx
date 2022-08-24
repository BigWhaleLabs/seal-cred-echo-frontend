import { LoadingText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

function BlockchainPostsListSuspended() {
  const { selectedPosts } = useSnapshot(PostStore)
  useScrollToAnchor()

  const posts = selectedPosts.filter((post) =>
    PostStore.selectedToken
      ? post.derivativeAddress === PostStore.selectedToken
      : post
  )
  const [loadedPosts, setLoadedPosts] = useState(posts.slice(0, 10))
  const loadedItemsAmount = loadedPosts.length
  const loadMoreItems = () => {
    setLoadedPosts([
      ...loadedPosts,
      ...posts.slice(loadedItemsAmount, loadedItemsAmount + 10),
    ])
  }

  return posts.length ? (
    <InfiniteScroll
      next={loadMoreItems}
      className={scrollContainer}
      style={{ overflow: 'hidden' }}
      dataLength={loadedItemsAmount}
      hasMore={loadedItemsAmount < posts.length}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
    >
      {loadedPosts.map((post) => (
        <BlockchainPost
          key={post.id}
          id={Number(post.id)}
          timestamp={Number(post.timestamp)}
          text={post.post}
          sender={post.sender}
          derivativeAddress={post.derivativeAddress}
        />
      ))}
    </InfiniteScroll>
  ) : (
    <NoPosts />
  )
}

export default function () {
  return (
    <Suspense fallback={<ListLoading text="Fetching blockchain posts..." />}>
      <BlockchainPostsListSuspended />
    </Suspense>
  )
}
