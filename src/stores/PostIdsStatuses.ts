import { DataContractNames, data } from 'data'
import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import dataShapeObject from 'helpers/dataShapeObject'
import getPostStatuses from 'helpers/getPostStatuses'

// We need to check statuses only for pending posts every 5 seconds + update lastUserPost every 5 seconds

interface PostData {
  status: PostStatus
  tweetId?: number | undefined
}

export interface LastUserPost {
  store: DataContractNames
  blockchainId: number
  status: PostStatus
  tweetId?: number
}

interface PostStatusStoreType {
  lastUserPost?: LastUserPost
  statuses: {
    [storageName: string]: { [blockchainId: number]: Promise<PostData> }
  }
}

interface CheckStatusesStoreProps {
  name: DataContractNames
  ids: number[]
  force?: boolean
}

const postStatusStore = proxy<PostStatusStoreType>({
  lastUserPost: undefined,
  statuses: dataShapeObject(() => ({})),
})

export async function updateStatuses(name: DataContractNames, ids: number[]) {
  const updatedStatuses = await getPostStatuses(ids, data[name].postStorage)

  for (const { blockchainId, status, tweetId } of updatedStatuses) {
    postStatusStore.statuses[name][blockchainId] = Promise.resolve({
      status,
      tweetId,
    })
    console.log('status updated higher', blockchainId, status, tweetId)

    if (status === PostStatus.pending) continue

    postStatusStore.lastUserPost = {
      store: name,
      status,
      blockchainId,
      tweetId,
    }
    console.log(
      'status updated now last processed post is: ',
      postStatusStore.lastUserPost
    )
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
    const ids: number[] = []

    // Get all posts ids with `pending` status
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
      name: name as DataContractNames,
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
