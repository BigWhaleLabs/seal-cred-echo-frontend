import { useEffect, useState } from 'react'
import { initPagination } from 'stores/PostStore'

const paginationLimit = initPagination.limit

export default function usePagination<T>(
  fetchMoreItems: (skip: number, limit: number) => Promise<T[]>,
  paginationLimitOverride?: number
) {
  const [items, setItems] = useState<T[]>([])
  const [moreItemsAvailable, setMoreItemsAvailable] = useState(true)

  const fetchMoreItemsIfNeeded = async () => {
    if (!moreItemsAvailable) {
      return
    }
    try {
      const finalLimit = paginationLimitOverride || paginationLimit
      const newItems = await fetchMoreItems(items.length, finalLimit)
      console.log('newItems', newItems)

      if (newItems.length) {
        setItems([...items, ...newItems])
      }
      if (newItems.length < finalLimit) {
        setMoreItemsAvailable(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    void fetchMoreItemsIfNeeded()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    items,
    setItems,
    fetchMoreItemsIfNeeded,
    moreItemsAvailable,
  }
}
