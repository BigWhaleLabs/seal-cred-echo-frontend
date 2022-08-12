import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useSnapshot } from 'valtio'
import postStore from 'stores/PostStore'
import usePostStorageKey from 'hooks/usePostStorageKey'

export default function usePosts() {
  const storageKey = usePostStorageKey()
  const { postStorages } = useSnapshot(postStore)

  if (!storageKey) return []
  if (!postStorages[storageKey]) {
    postStore.fetchPostsByName(storageKey)
    return []
  }

  return postStorages[storageKey].map(
    ([id, post, derivativeAddress, sender, timestamp]) =>
      ({
        id,
        post,
        derivativeAddress,
        sender,
        timestamp,
      } as PostStructOutput)
  )
}
