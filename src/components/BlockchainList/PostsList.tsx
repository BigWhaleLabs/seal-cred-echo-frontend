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

  const data = selectedPosts.filter((post) =>
    PostStore.selectedToken
      ? post.derivativeAddress === PostStore.selectedToken
      : post
  )
  // Take first 10 posts from the list
  const [items, setItems] = useState(data.slice(0, 10))
  const loadedItemsAmount = items.length
  // If there are more items to be loaded then take data from the list
  const loadMoreItems = () => {
    setItems([
      ...items,
      ...data.slice(loadedItemsAmount, loadedItemsAmount + 10),
    ])
  }

  return data.length ? (
    <InfiniteScroll
      endMessage={<></>}
      next={loadMoreItems}
      className={scrollContainer}
      dataLength={loadedItemsAmount}
      hasMore={loadedItemsAmount < data.length}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
    >
      {items.map((post) => (
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
