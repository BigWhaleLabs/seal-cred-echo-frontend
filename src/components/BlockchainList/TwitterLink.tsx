import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import postIdsStatuses from 'stores/PostIdsStatuses'

function TwitterLinkSuspended({ id }: { id: number }) {
  const { currentStatuses } = useSnapshot(postIdsStatuses)
  const statusId = currentStatuses[id]?.statusId

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
    <Suspense fallback={null}>
      <TwitterLinkSuspended id={id} />
    </Suspense>
  )
}
