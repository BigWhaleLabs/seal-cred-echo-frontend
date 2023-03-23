import { LoadingText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useLocation } from 'react-router-dom'
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
  const { limit, postsAmount, selectedPosts, selectedToken } =
    useSnapshot(PostStore)
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const totalPosts = postsAmount[selectedType]
  const { hash } = useLocation()
  const { hashId, hashStore } = useHashParams(hash)
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
      className={scrollContainer}
      dataLength={amountOfLoadedPosts}
      hasMore={amountOfLoadedPosts < totalPosts}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
      style={{ overflow: 'hidden' }}
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
    >
      {posts.map((post) => (
        <BlockchainPost
          blockchainId={Number(post.id)}
          derivativeAddress={post.derivativeAddress}
          key={post.id}
          postType={selectedType}
          sender={post.sender}
          text={post.post}
          timestamp={Number(post.timestamp)}
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
