import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import dataShapeObject from 'helpers/dataShapeObject'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

const initValues = {
  skip: 0,
  limit: 5,
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
          initValues.skip,
          initValues.limit
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
    initValues.skip,
    initValues.limit
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
