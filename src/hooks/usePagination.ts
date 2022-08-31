import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'

export default function usePagination<T>({
  limit,
  totalAmount,
  fetchMoreItems,
}: {
  limit: number
  totalAmount: number
  fetchMoreItems: (skip: number, limit: number) => Promise<T[]>
}) {
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const { selectedPosts } = useSnapshot(PostStore)
  const currentPostsAmount = selectedPosts.length

  const fetchMoreItemsIfNeeded = async () => {
    try {
      const leftRecords = totalAmount - currentPostsAmount
      const finalLimit = limit > leftRecords ? leftRecords : limit
      const shouldSkip = totalAmount - finalLimit - currentPostsAmount
      const finalSkip = shouldSkip > 0 ? shouldSkip : 0

      const newItems = await fetchMoreItems(finalSkip, finalLimit)

      // Add new fetched items to store
      if (newItems.length) {
        PostStore.posts[selectedType] = [
          ...PostStore.posts[selectedType],
          ...(newItems as PostStructOutput[]),
        ]
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    void fetchMoreItemsIfNeeded()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { fetchMoreItemsIfNeeded }
}
