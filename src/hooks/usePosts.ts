import { useSnapshot } from 'valtio'
import postStore from 'stores/PostStore'
// import usePostStorageKey from 'hooks/usePostStorageKey'

export default function usePosts() {
  const storageKey = 'ERC721' // usePostStorageKey()
  const { postStorages } = useSnapshot(postStore)

  if (!storageKey) return []
  if (!postStorages[storageKey]) {
    postStore.fetchPostsByName(storageKey)
    return []
  }

  return postStorages[storageKey]
}
