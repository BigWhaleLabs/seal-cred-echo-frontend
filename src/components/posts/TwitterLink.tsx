import { BigNumber } from 'ethers'
import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import postStore from 'stores/PostStore'
import usePostStorageKey from 'hooks/usePostStorageKey'

function TwitterLink({ id }: { id: BigNumber }) {
  const storageKey = usePostStorageKey()
  const { idsToStatuses } = useSnapshot(postStore)

  const statusId =
    storageKey &&
    idsToStatuses[storageKey] &&
    idsToStatuses[storageKey][id.toNumber()]?.statusId

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

export default function ({ id }: { id: BigNumber }) {
  return (
    <Suspense fallback={<></>}>
      <TwitterLink id={id} />
    </Suspense>
  )
}
