import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import dataShapeObject from 'helpers/dataShapeObject'
import getMorePosts from 'helpers/getMorePosts'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'

interface PostStoreType {
  limit: number
  posts: { [storageName: string]: Promise<PostStructOutput[]> }
  postsAmount: { [storageName: string]: Promise<number> }
  selectedToken?: string
}

const limit = 100

const postStore = proxy<PostStoreType>({
  limit,
  posts: dataShapeObject(
    (key): Promise<PostStructOutput[]> =>
      SelectedTypeStore.selectedType === key
        ? getMorePosts({
            contract: postStorageContracts[key],
            limitAmount: limit,
          })
        : Promise.resolve([] as PostStructOutput[])
  ),
  postsAmount: dataShapeObject((key) =>
    safeGetPostsAmountFromContract(postStorageContracts[key])
  ),
  selectedToken: undefined,
})

subscribeKey(SelectedTypeStore, 'selectedType', (selectedType) => {
  postStore.posts[selectedType] = getMorePosts({
    contract: postStorageContracts[selectedType],
    limitAmount: postStore.limit,
  })
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
