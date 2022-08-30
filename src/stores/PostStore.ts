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
  posts: { [storageName: string]: Promise<PostStructOutput[]> }
  postsAmount: { [storageName: string]: Promise<number> }
  selectedToken?: string
  loadMorePosts: (
    storageName: string,
    skip: number,
    limit: number
  ) => Promise<PostStructOutput[]>
}

const initLimit = 100

const postStore = proxy<PostStoreType>({
  postsLimit: initLimit,
  posts: dataShapeObject((key) =>
    SelectedTypeStore.selectedType === key
      ? safeGetPostsFromContract(postStorageContracts[key], 0, initLimit)
      : Promise.resolve([] as PostStructOutput[])
  ),
  postsAmount: dataShapeObject((key) =>
    SelectedTypeStore.selectedType === key
      ? safeGetPostsAmountFromContract(postStorageContracts[key])
      : Promise.resolve(0)
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

subscribeKey(SelectedTypeStore, 'selectedType', (selectedType) => {
  postStore.posts[selectedType] = postStore.loadMorePosts(
    selectedType,
    0,
    initLimit
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
