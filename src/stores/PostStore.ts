import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import dataShapeObject from 'helpers/dataShapeObject'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

const postStore = proxy({
  posts: dataShapeObject((key) =>
    SelectedTypeStore.selectedType === key
      ? safeGetPostsFromContract(postStorageContracts[key])
      : Promise.resolve([] as PostStructOutput[])
  ),
})

subscribeKey(SelectedTypeStore, 'selectedType', (selectedType) => {
  postStore.posts[selectedType] = safeGetPostsFromContract(
    postStorageContracts[selectedType]
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
