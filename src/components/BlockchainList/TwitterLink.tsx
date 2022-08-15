import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import postStore from 'stores/PostStore'

function TwitterLink({ id }: { id: number }) {
  const { selectedType } = useSnapshot(SelectedTypeStore)
  const { idsToStatuses } = useSnapshot(postStore)

  const statusId =
    selectedType &&
    idsToStatuses[selectedType] &&
    idsToStatuses[selectedType][id]?.statusId

  if (!statusId) return null

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredEmail/status/${statusId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}

export default function ({ id }: { id: number }) {
  return (
    <Suspense fallback={<></>}>
      <TwitterLink id={id} />
    </Suspense>
  )
}
