import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import data from 'data'

export default function usePostStorageKey() {
  const { currentTwitterAccount } = useSnapshot(AppStore)

  const storage = Object.entries(data).find(
    ([_, value]) => value.twitter === currentTwitterAccount
  )

  return storage && storage[0]
}
