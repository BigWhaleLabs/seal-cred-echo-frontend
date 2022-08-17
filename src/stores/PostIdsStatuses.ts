import { derive, proxySet, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import data from 'data'
import dataShapeObject from 'helpers/dataShapeObject'
import getPostStatuses from 'helpers/getPostStatuses'

const postStatusStore = proxy({
  lastProccessedStatusId: undefined as number | undefined,
  processing: dataShapeObject(() => proxySet<number>([])),
  statuses: dataShapeObject(
    () =>
      ({} as {
        [postId: string]: Promise<{ status: PostStatus; statusId?: number }>
      })
  ),
})

export async function updateStatuses(
  name: keyof typeof data,
  ids: number[],
  withProcessing?: boolean
) {
  const updatedStatuses = await getPostStatuses(ids, data[name].postStorage)

  for (const { tweetId, status, statusId } of updatedStatuses) {
    postStatusStore.statuses[name][tweetId] = Promise.resolve({
      status,
      statusId,
    })

    if (
      withProcessing &&
      postStatusStore.processing[name].has(tweetId) &&
      status === PostStatus.published
    ) {
      postStatusStore.processing[name].delete(tweetId)
      postStatusStore.lastProccessedStatusId = statusId
    }
  }
}

let checkingStatuses = false
async function checkStatuses(
  name: keyof typeof data,
  ids: number[],
  force?: boolean,
  withProcessing?: boolean
) {
  if (checkingStatuses && !force) return
  checkingStatuses = true
  try {
    await updateStatuses(name, ids, withProcessing)
  } catch (error) {
    console.error(error)
  } finally {
    checkingStatuses = false
  }
}

async function updateStatusesForSelectedPosts(
  result = PostStore.selectedPosts
) {
  const ids = (await result).map(({ id }) => id.toNumber())
  void checkStatuses(SelectedTypeStore.selectedType, ids, true)
}

subscribeKey(PostStore, 'selectedPosts', updateStatusesForSelectedPosts)
setInterval(() => updateStatusesForSelectedPosts(), 5000)

setInterval(async () => {
  for (const name in postStatusStore.processing) {
    console.log('update processing')
    await checkStatuses(
      name as keyof typeof data,
      Array.from(postStatusStore.processing[name]),
      false,
      true
    )
  }
}, 5000)

export default derive(
  {
    pendingPost: (get) => {
      const processing = get(postStatusStore).processing
      for (const store of Object.keys(processing)) {
        const [id] = processing[store]
        if (typeof id !== 'undefined') return { store, id }
      }
      return null
    },
    currentStatuses: (get) =>
      get(postStatusStore).statuses[SelectedTypeStore.selectedType],
  },
  {
    proxy: postStatusStore,
  }
)
