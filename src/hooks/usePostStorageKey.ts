import { useMemo } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import data from 'data'

export default function usePostStorageKey() {
  const { currentTwitterAccount } = useSnapshot(AppStore)

  const storage = useMemo(
    () =>
      Object.entries(data).find(
        ([_, value]) => value.twitter === currentTwitterAccount
      ),
    [currentTwitterAccount]
  )

  return storage && storage[0]
}
