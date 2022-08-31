import { useEffect, useState } from 'react'

export default function usePagination<T>({
  limit,
  totalAmount,
  fetchMoreItems,
}: {
  limit: number
  totalAmount: number
  fetchMoreItems: (skip: number, limit: number) => Promise<T[]>
}) {
  const [items, setItems] = useState<T[]>([])
  const [moreItemsAvailable, setMoreItemsAvailable] = useState(true)

  const fetchMoreItemsIfNeeded = async () => {
    if (!moreItemsAvailable) {
      return
    }
    try {
      const leftRecords = totalAmount - items.length
      const finalLimit = limit > leftRecords ? leftRecords : limit
      const shouldSkip = totalAmount - finalLimit - items.length
      const finalSkip = shouldSkip > 0 ? shouldSkip : 0

      const newItems = await fetchMoreItems(finalSkip, finalLimit)

      if (newItems.length) {
        setItems([...items, ...newItems])
      }
      if (finalSkip <= 0) {
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
