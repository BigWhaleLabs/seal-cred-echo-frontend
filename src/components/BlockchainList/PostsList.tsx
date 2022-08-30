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
  const { selectedPosts } = useSnapshot(PostStore)
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const { hashStore, hashId } = useHashParams()
  const matchStore = hashStore && hashStore === selectedType

  // @Todo: check for skipping to the specific post
  // const sliceToSpecificPost = (totalPosts: number) => {
  //   if (!(matchStore || hashId)) return 10
  //   return totalPosts - Number(hashId)
  // }

  // @Todo: think about filtering posts by selectedToken
  // const posts = PostStore.selectedToken
  // ? selectedPosts.filter(
  //     ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
  // ) : selectedPosts
  const { items, fetchMoreItemsIfNeeded, moreItemsAvailable } = usePagination(
    (skip, limit) =>
      PostStore.loadMorePosts(SelectedTypeStore.selectedType, skip, limit)
  )

  if (matchStore && hashId) useScrollToAnchor({ callback: flashingPost })

  return selectedPosts.length ? (
    <InfiniteScroll
      next={fetchMoreItemsIfNeeded}
      className={scrollContainer}
      style={{ overflow: 'hidden' }}
      dataLength={items.length}
      hasMore={moreItemsAvailable}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
    >
      {items.map((post) => (
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
