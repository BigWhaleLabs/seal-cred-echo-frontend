import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

const postStore = proxy({
  posts: safeGetPostsFromContract(postStorageContracts['ERC721']),
})

subscribeKey(SelectedTypeStore, 'selectedType', (selectedType) => {
  postStore.posts = safeGetPostsFromContract(postStorageContracts[selectedType])
})

export default postStore
