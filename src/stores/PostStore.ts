import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import dataShapeObject from 'helpers/dataShapeObject'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

interface PostStoreType {
  postsLimit: number
  posts: { [storageName: string]: PostStructOutput[] }
  postsAmount: { [storageName: string]: Promise<number> }
  selectedToken?: string
  loadMorePosts: (
    storageName: string,
    skip: number,
    limit: number
  ) => Promise<PostStructOutput[]>
}

const initLimit = 3

const postStore = proxy<PostStoreType>({
  postsLimit: initLimit,
  posts: dataShapeObject(() => []),
  postsAmount: dataShapeObject((key) =>
    safeGetPostsAmountFromContract(postStorageContracts[key])
  ),
  selectedToken: undefined,
  loadMorePosts: (storageName: string, skip: number, limit: number) => {
    return safeGetPostsFromContract(
      postStorageContracts[storageName],
      skip,
      limit
    )
  },
})

subscribeKey(SelectedTypeStore, 'selectedType', async (selectedType) => {
  const total = await postStore.postsAmount[selectedType]
  const skip = total < initLimit ? 0 : total - initLimit
  const limit = total < initLimit ? total : initLimit

  postStore.posts[selectedType] = await postStore.loadMorePosts(
    selectedType,
    skip,
    limit
  )
})

export default derive(
  {
    selectedPosts: (get) =>
      get(postStore).posts[SelectedTypeStore.selectedType],
  },
  {
    proxy: postStore,
  }
)
