import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import DataKeys from 'models/DataKeys'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import data from 'data'
import dataShapeObject from 'helpers/dataShapeObject'
import getPostStatuses from 'helpers/getPostStatuses'

// Check statuses only for pending posts every 5 seconds
// Update lastUserPost for current account every 5 seconds or when the user creates a post

interface PostData {
  status: PostStatus
  tweetId?: number | undefined
}

export interface LastUserPostData {
  store: DataKeys
  blockchainId: number
  status: PostStatus
  tweetId?: number
}

interface PostStatusStoreType {
  lastUserPost?: { [account: string]: LastUserPostData }
  statuses: {
    [storageName: string]: { [blockchainId: number]: Promise<PostData> }
  }
}

interface CheckStatusesStoreProps {
  name: DataKeys
  ids: number[]
  force?: boolean
}

const postStatusStore = proxy<PostStatusStoreType>({
  lastUserPost: undefined,
  statuses: dataShapeObject(() => ({})),
})

export async function updateStatuses(name: DataKeys, ids: number[]) {
  const updatedStatuses = await getPostStatuses(ids, data[name].postStorage)

  for (const { blockchainId, status, tweetId } of updatedStatuses) {
    postStatusStore.statuses[name][blockchainId] = Promise.resolve({
      status,
      tweetId,
    })

    const lastUserPost = postStatusStore.lastUserPost
    if (!lastUserPost) continue

    // Update status of lastUserPost only having blockchainId
    Object.keys(lastUserPost).filter((account) => {
      if (
        !lastUserPost[account] ||
        !(lastUserPost[account].blockchainId === blockchainId) ||
        !postStatusStore.lastUserPost
      )
        return
      postStatusStore.lastUserPost[account] = {
        store: name,
        blockchainId,
        status,
        tweetId,
      }
    })
  }
}

let checkingStatuses = false
async function checkStatuses({ name, ids, force }: CheckStatusesStoreProps) {
  if (checkingStatuses && !force) return
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
  void checkStatuses({ name: SelectedTypeStore.selectedType, ids, force: true })
}

subscribeKey(PostStore, 'selectedPosts', updateStatusesForSelectedPosts)
setInterval(() => updateStatusesForSelectedPosts(), 5000)

setInterval(async () => {
  for (const name in Object.keys(data)) {
    if (!postStatusStore.statuses[name]) return
    const ids: number[] = []

    await Promise.all(
      Object.entries(postStatusStore.statuses[name]).map(
        async ([blockchainId, postData]) => {
          const resolvedPostData = await postData
          if (resolvedPostData.status === PostStatus.pending)
            ids.push(Number(blockchainId))
        }
      )
    )
    if (!ids) return

    await checkStatuses({
      name: name as DataKeys,
      ids,
      force: false,
    })
  }
}, 5000)

export default derive(
  {
    currentStatuses: (get) =>
      get(postStatusStore).statuses[SelectedTypeStore.selectedType],
  },
  {
    proxy: postStatusStore,
  }
)
