import { LoadingText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import ListLoading from 'components/ListLoading'
import NoPosts from 'components/BlockchainList/NoPosts'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'
import flashingPost from 'helpers/flashingPost'
import useHashParams from 'hooks/useHashParams'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

function BlockchainPostsListSuspended() {
  const { selectedPosts } = useSnapshot(PostStore)
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const { hashStore, hashId } = useHashParams()
  const matchStore = hashStore && hashId === selectedType

  const sliceToSpecificPost = (totalPosts: number) => {
    if (!(matchStore || hashId)) return 10
    return totalPosts - Number(hashId)
  }

  const posts = PostStore.selectedToken
    ? selectedPosts.filter(
        ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
      )
    : selectedPosts
  const [loadedPosts, setLoadedPosts] = useState(
    posts.slice(0, sliceToSpecificPost(posts.length))
  )
  const loadedItemsAmount = loadedPosts.length
  const loadMoreItems = () => {
    setLoadedPosts([
      ...loadedPosts,
      ...posts.slice(loadedItemsAmount, loadedItemsAmount + 10),
    ])
  }

  if (matchStore && hashId) useScrollToAnchor({ callback: flashingPost })

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
          postType={selectedType}
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
