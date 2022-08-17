import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import data from 'data'
import dataShapeObject from 'helpers/dataShapeObject'
import getPostStatuses from 'helpers/getPostStatuses'

const postStatusStore = proxy({
  proccessing: dataShapeObject<number[]>(() => []),
  statuses: dataShapeObject(
    () =>
      ({} as { [postId: string]: { status: PostStatus; statusId?: number } })
  ),
})

export async function updateStatuses(name: keyof typeof data, ids?: number[]) {
  const updatedStatuses = await getPostStatuses(
    ids || postStatusStore.proccessing[name],
    data[name].postStorage
  )

  for (const { tweetId, status, statusId } of updatedStatuses) {
    postStatusStore.statuses[name][tweetId] = {
      status,
      statusId,
    }
  }
}

let checkingStatuses = false
async function checkStatuses(name: keyof typeof data, ids?: number[]) {
  if (checkingStatuses && !ids) return
  checkingStatuses = true
  try {
    await updateStatuses(name)
  } catch (error) {
    console.error(error)
  } finally {
    checkingStatuses = false
  }
}

subscribeKey(PostStore, 'selectedPosts', async (result) => {
  void checkStatuses(
    SelectedTypeStore.selectedType as keyof typeof data,
    (await result).map(({ id }) => id.toNumber())
  )
})

setInterval(() => checkStatuses(SelectedTypeStore.selectedType), 15 * 1000)

export default derive(
  {
    currentStatuses: (get) =>
      get(postStatusStore).statuses[SelectedTypeStore.selectedType],
  },
  {
    proxy: postStatusStore,
  }
)
