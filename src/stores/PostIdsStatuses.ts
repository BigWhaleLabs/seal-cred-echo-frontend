import { derive, proxySet, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import data from 'data'
import dataShapeObject from 'helpers/dataShapeObject'
import getPostStatuses from 'helpers/getPostStatuses'

const postStatusStore = proxy({
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
  ids = Array.from(postStatusStore.processing[name])
) {
  const updatedStatuses = await getPostStatuses(ids, data[name].postStorage)

  for (const { tweetId, status, statusId } of updatedStatuses) {
    postStatusStore.statuses[name][tweetId] = Promise.resolve({
      status,
      statusId,
    })
  }
}

let checkingStatuses = false
async function checkStatuses(name: keyof typeof data, ids?: number[]) {
  if (checkingStatuses && !ids) return
  checkingStatuses = true
  try {
    await updateStatuses(name, ids)
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
  void checkStatuses(SelectedTypeStore.selectedType, ids)
}

subscribeKey(PostStore, 'selectedPosts', updateStatusesForSelectedPosts)
setInterval(() => updateStatusesForSelectedPosts(), 5000)

export default derive(
  {
    currentStatuses: (get) =>
      get(postStatusStore).statuses[SelectedTypeStore.selectedType],
  },
  {
    proxy: postStatusStore,
  }
)
