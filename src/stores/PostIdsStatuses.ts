import { derive, proxySet, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import data from 'data'
import dataShapeObject from 'helpers/dataShapeObject'
import getPostStatuses from 'helpers/getPostStatuses'

interface StatusType {
  status: PostStatus
  statusId?: number | undefined
}
interface PostStatusStoreType {
  lastProcessedPost?: { store: string; statusId?: number }
  processing: { [storageName: string]: Set<number> }
  statuses: { [storageName: string]: { [postId: string]: Promise<StatusType> } }
}

interface CheckStatusesStoreProps {
  name: keyof typeof data
  ids: number[]
  force?: boolean
  withProcessing?: boolean
}

export type PendingPostType = {
  store: keyof typeof data
  id: number
}

const postStatusStore = proxy<PostStatusStoreType>({
  lastProcessedPost: undefined,
  processing: dataShapeObject(() => proxySet<number>([])),
  statuses: dataShapeObject(() => ({})),
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
      postStatusStore.lastProcessedPost = { store: name, statusId }
    }
  }
}

let checkingStatuses = false
async function checkStatuses({
  name,
  ids,
  force,
  withProcessing,
}: CheckStatusesStoreProps) {
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
  void checkStatuses({ name: SelectedTypeStore.selectedType, ids, force: true })
}

subscribeKey(PostStore, 'selectedPosts', updateStatusesForSelectedPosts)
setInterval(() => updateStatusesForSelectedPosts(), 5000)

setInterval(async () => {
  for (const name in postStatusStore.processing) {
    await checkStatuses({
      name: name as keyof typeof data,
      ids: Array.from(postStatusStore.processing[name]),
      force: false,
      withProcessing: true,
    })
  }
}, 5000)

export default derive(
  {
    pendingPost: (get) => {
      const processing = get(postStatusStore).processing
      for (const store of Object.keys(processing)) {
        const [id] = processing[store]
        if (typeof id !== 'undefined') return { store, id } as PendingPostType
      }
      return null
    },
    lastProcessedUserPost: (get) => {
      const currentPostStatues = get(postStatusStore)
      if (!currentPostStatues.lastProcessedPost?.statusId) return
      const { statusId } = currentPostStatues.lastProcessedPost
      const store = SelectedTypeStore.selectedType

      return {
        store,
        postStatus: currentPostStatues.statuses[store][statusId],
      }
    },
    currentStatuses: (get) =>
      get(postStatusStore).statuses[SelectedTypeStore.selectedType],
  },
  {
    proxy: postStatusStore,
  }
)
