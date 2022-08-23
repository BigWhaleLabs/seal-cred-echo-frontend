import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import postIdsStatuses from 'stores/PostIdsStatuses'

interface TwitterLinkProps {
  blockchainId: number
}

function TwitterLinkSuspended({ blockchainId }: TwitterLinkProps) {
  const currentStatuses = useSnapshot(postIdsStatuses.currentStatuses)

  if (!currentStatuses[blockchainId]) return null
  const { tweetId } = currentStatuses[blockchainId]

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredEmail/status/${tweetId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}

export default function ({ blockchainId }: TwitterLinkProps) {
  return (
    <Suspense fallback={null}>
      <TwitterLinkSuspended blockchainId={blockchainId} />
    </Suspense>
  )
}
