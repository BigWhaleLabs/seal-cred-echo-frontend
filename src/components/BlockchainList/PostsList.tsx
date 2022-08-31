import { LoadingText } from 'components/Text'
import { Suspense } from 'preact/compat'
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
import usePagination from 'hooks/usePagination'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

function BlockchainPostsListSuspended() {
  const { selectedPosts, postsAmount } = useSnapshot(PostStore)
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const totalPosts = postsAmount[selectedType]
  const { hashStore, hashId } = useHashParams()
  const matchStore = hashStore && hashStore === selectedType

  const slideToSpecificPost = (totalPosts: number) => {
    if (!(matchStore || hashId)) return PostStore.postsLimit
    const neededLimit = totalPosts - Number(hashId)
    return matchStore
      ? neededLimit > PostStore.postsLimit
        ? neededLimit
        : PostStore.postsLimit
      : PostStore.postsLimit
  }

  const { fetchMoreItemsIfNeeded } = usePagination({
    totalAmount: postsAmount[selectedType],
    limit: slideToSpecificPost(postsAmount[selectedType]),
    fetchMoreItems: (skip, limit) =>
      PostStore.loadMorePosts(SelectedTypeStore.selectedType, skip, limit),
  })

  if (matchStore && hashId && selectedPosts.length)
    useScrollToAnchor({ callback: flashingPost })

  return totalPosts > 0 ? (
    <InfiniteScroll
      next={fetchMoreItemsIfNeeded}
      className={scrollContainer}
      style={{ overflow: 'hidden' }}
      dataLength={selectedPosts.length}
      hasMore={selectedPosts.length < totalPosts}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
    >
      {selectedPosts.map((post) => (
        <BlockchainPost
          key={post.id}
          blockchainId={Number(post.id)}
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
