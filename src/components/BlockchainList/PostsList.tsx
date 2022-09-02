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
import getMorePosts from 'helpers/getMorePosts'
import postStorageContracts from 'helpers/postStorageContracts'
import useHashParams from 'hooks/useHashParams'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

function BlockchainPostsListSuspended() {
  const { selectedPosts, selectedToken, postsAmount, limit } =
    useSnapshot(PostStore)
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const totalPosts = postsAmount[selectedType]
  const { hashStore, hashId } = useHashParams()
  const matchStore = hashStore && hashStore === selectedType
  const [scrolledLimit, setScrolledLimit] = useState(limit)
  const amountOfLoadedPosts = selectedPosts.length

  const posts = selectedToken
    ? selectedPosts.filter(
        ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
      )
    : selectedPosts

  if (matchStore && hashId && !!amountOfLoadedPosts)
    useScrollToAnchor({ callback: flashingPost })

  return totalPosts > 0 ? (
    <InfiniteScroll
      next={async () => {
        const newPosts = await getMorePosts({
          contract: postStorageContracts[selectedType],
          limitAmount: scrolledLimit,
          loadedPostAmount: amountOfLoadedPosts,
        })
        PostStore.posts[selectedType] = Promise.resolve([
          ...selectedPosts,
          ...newPosts,
        ])
        setScrolledLimit(PostStore.limit)
      }}
      className={scrollContainer}
      style={{ overflow: 'hidden' }}
      dataLength={amountOfLoadedPosts}
      hasMore={amountOfLoadedPosts < totalPosts}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
    >
      {posts.map((post) => (
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
