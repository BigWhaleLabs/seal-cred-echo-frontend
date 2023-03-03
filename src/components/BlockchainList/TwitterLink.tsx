import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import postIdsStatuses from 'stores/PostIdsStatuses'

function TwitterLinkSuspended({ statusIndex }: { statusIndex: number }) {
  const { currentStatuses } = useSnapshot(postIdsStatuses)

  if (!currentStatuses[statusIndex]) return null
  const { serviceId } = currentStatuses[statusIndex]

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredEmail/status/${serviceId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}

export default function ({ blockchainId }: { blockchainId: number }) {
  return (
    <Suspense fallback={null}>
      <TwitterLinkSuspended statusIndex={blockchainId - 1} />
    </Suspense>
  )
}
