import { Suspense } from 'preact/compat'
import { VariableSizeList } from 'react-window'
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

  return (
    <>
      {data.length ? (
        <VariableSizeList
          itemSize={(index) => {
            const blockHeight = 150
            const rowHeight = 18
            const oneRowLength = data[index].post.length / 66
            const moreThanOneRow = oneRowLength > 1
            return moreThanOneRow
              ? blockHeight + oneRowLength * rowHeight
              : blockHeight
          }}
          width={565}
          height={700}
          itemCount={data.length}
        >
          {Row}
        </VariableSizeList>
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
