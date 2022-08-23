import { AccentText, LoadingText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import SealLogo from 'icons/SealLogo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
  width,
} from 'classnames/tailwind'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

const endMessageWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  margin('my-4'),
  gap('gap-y-2'),
  width('w-full')
)

function BlockchainPostsListSuspended() {
  const { selectedPosts } = useSnapshot(PostStore)
  useScrollToAnchor()

  const data = selectedPosts.filter((post) =>
    PostStore.selectedToken
      ? post.derivativeAddress === PostStore.selectedToken
      : post
  )
  const EndMessage = () => (
    <div className={endMessageWrapper}>
      <SealLogo />
      <AccentText bold color="text-accent">
        No more posts
      </AccentText>
    </div>
  )
  // Take first 10 posts from the list
  const [items, setItems] = useState(data.slice(0, 10))
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const loadMoreItems = () => {
    setItems([...items, ...data.slice(items.length, items.length + 10)])
  }

  return (
    <>
      {data.length ? (
        <InfiniteScroll
          dataLength={items.length}
          next={loadMoreItems}
          hasMore={items.length < data.length}
          loader={<LoadingText>Fetching more posts...</LoadingText>}
          endMessage={<EndMessage />}
        >
          <>
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
          </>
        </InfiniteScroll>
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
