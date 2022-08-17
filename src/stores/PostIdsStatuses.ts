import { proxyMap, subscribeKey } from 'valtio/utils'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import data from 'data'
import getPostStatuses from 'helpers/getPostStatuses'

const postStatusStore = proxyMap<
  number,
  { status: PostStatus; statusId?: number }
>()

export async function updateStatuses(name: keyof typeof data, ids?: number[]) {
  const updatedStatuses = await getPostStatuses(
    ids ||
      Array.from(postStatusStore.entries())
        .filter(([, record]) => record.status !== PostStatus.published)
        .map(([id]) => id),
    data[name].postStorage
  )

  for (const { tweetId, status, statusId } of updatedStatuses) {
    postStatusStore.set(tweetId, {
      status,
      statusId,
    })
  }
}

let checkingStatuses = false
async function checkStatuses(name: keyof typeof data, force?: boolean) {
  if (checkingStatuses && !force) return
  checkingStatuses = true
  try {
    await updateStatuses(name)
  } catch (error) {
    console.error(error)
  } finally {
    checkingStatuses = false
  }
}

subscribeKey(SelectedTypeStore, 'selectedType', (selectedType) => {
  void checkStatuses(selectedType as keyof typeof data, true)
})

subscribeKey(PostStore, 'posts', async (result) => {
  void updateStatuses(
    SelectedTypeStore.selectedType as keyof typeof data,
    (await result).map(({ id }) => id.toNumber())
  )
})

setInterval(() => checkStatuses(SelectedTypeStore.selectedType), 15 * 1000)

export default postStatusStore
