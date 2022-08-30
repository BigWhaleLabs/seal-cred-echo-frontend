import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import dataShapeObject from 'helpers/dataShapeObject'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

export const initPagination = {
  skip: 0,
  limit: 20,
}
interface PostStoreType {
  posts: { [storageName: string]: Promise<PostStructOutput[]> }
  selectedToken?: string
  loadMorePosts: (
    storageName: string,
    skip: number,
    limit: number
  ) => Promise<PostStructOutput[]>
}

const postStore = proxy<PostStoreType>({
  posts: dataShapeObject((key) =>
    SelectedTypeStore.selectedType === key
      ? safeGetPostsFromContract(
          postStorageContracts[key],
          initPagination.skip,
          initPagination.limit
        )
      : Promise.resolve([] as PostStructOutput[])
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
    initPagination.skip,
    initPagination.limit
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
