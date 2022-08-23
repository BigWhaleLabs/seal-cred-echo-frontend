import { Suspense, useState } from 'preact/compat'
import { VariableSizeList } from 'react-window'
import { useSnapshot } from 'valtio'
import AutoSizer from 'react-virtualized-auto-sizer'
import BlockchainPost from 'components/BlockchainList/BlockchainPost'
import InfiniteLoader from 'react-window-infinite-loader'
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

  const Row = ({ index, style }: { index: number; style: string }) => {
    const post = data[index]

    return (
      <div style={style}>
        <BlockchainPost
          key={post.id}
          id={Number(post.id)}
          timestamp={Number(post.timestamp)}
          text={post.post}
          sender={post.sender}
          derivativeAddress={post.derivativeAddress}
        />
      </div>
    )
  }
  // Take first 10 posts from the list
  const [items, setItems] = useState(data.slice(0, 10))
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = data.length > items.length ? items.length + 1 : items.length
  const loadMoreItems = () => {
    console.log('next')
    setItems([...items, ...data.slice(items.length, items.length + 10)])
  }
  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => {
    return data.length < items.length || index < items.length
  }

  return (
    <>
      {data.length ? (
        <AutoSizer
          disableWidth
          disableHeight
          onResize={(size) => {
            console.log(size)
          }}
        >
          {() => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <VariableSizeList
                  itemSize={(index: number) => {
                    const blockHeight = 150
                    const rowHeight = 18
                    const oneRowLength = items[index].post.length / 66
                    const moreThanOneRow = oneRowLength > 1
                    return moreThanOneRow
                      ? blockHeight + oneRowLength * rowHeight
                      : blockHeight
                  }}
                  width="100%"
                  height={700}
                  ref={ref}
                  onItemsRendered={onItemsRendered}
                  itemCount={itemCount}
                >
                  {Row}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
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
